import { useTheme } from '@emotion/react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import { AppContext } from 'Context/AppContext';
import { getProgress, IHabit, mergeDates, provideFeedback } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, InteractionManager } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GradientColours } from 'Styles/Colours';
import { Row } from 'Styles/Globals';
import CircleModule from './Modules/CircleModule';

// Debouncing update to prevent lag during excessive renders
const updateHabitDebounced = AwesomeDebouncePromise(
    (habit: IHabit, updateHabit: (habit: IHabit) => Promise<void>, date: string, progress: number) => {
        console.log('Yes');
        updateHabit({ ...habit, dates: mergeDates(habit, date, progress) });
    },
    500,
);
interface ViewScreenProps {
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

const ViewScreen: React.FC<ViewScreenProps> = ({ navigation, route }) => {
    // Theme colours
    const theme = useTheme();

    // Habit and context actions
    const { habits, updateHabit } = useContext(AppContext);
    const { id, prevIndex } = route.params;
    const habit = habits[id];
    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    // Updating header information if habit is updated
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: habit.name,
        });
    }, [navigation, habit.colour, habit.name]);

    // Ready state
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsReady(true);
        });
    }, []);

    // Dates
    const [currentDateIndex, setCurrentDateIndex] = useState(-prevIndex);
    const currentDate = useMemo(() => moment().add(currentDateIndex, 'd'), [currentDateIndex]);
    const date = useMemo(() => currentDate.format('YYYY-MM-DD'), [currentDate]);

    // Progress and animations
    const [progress, setProgress] = useState(getProgress(habit, date));

    // Updating progress if date is changed
    useEffect(() => {
        setProgress(getProgress(habit, date));
    }, [habit, date]);

    return (
        <DismissableScrollView navigation={navigation}>
            <ArrowControls
                title={currentDate.format('MMM Do YYYY')}
                colour={gradient.solid}
                onLeftPress={() => setCurrentDateIndex(currentDateIndex - 1)}
                onRightPress={() => setCurrentDateIndex(currentDateIndex + 1)}
            />
            <CircleModule progress={progress} total={habit.total} colour={gradient.solid} />

            <View style={Row}></View>

            <TouchableOpacity
                style={{ backgroundColor: 'red', width: 50, height: 50 }}
                onPress={() => {
                    setProgress(progress + 1);
                    updateHabitDebounced(habit, updateHabit, date, progress + 1);
                    provideFeedback(habit, progress + 1);
                }}
            />
            <TouchableOpacity
                disabled={progress <= 0}
                style={{ backgroundColor: 'green', width: 50, height: 50 }}
                onPress={() => {
                    setProgress(progress - 1);
                    updateHabitDebounced(habit, updateHabit, date, progress - 1);
                }}
            />
            <TouchableOpacity
                style={{ backgroundColor: 'yellow', width: 50, height: 50 }}
                onPress={() => {
                    setProgress(progress >= habit.total ? 0 : habit.total);
                    provideFeedback(habit, progress >= habit.total ? 0 : habit.total);
                    updateHabitDebounced(habit, updateHabit, date, progress >= habit.total ? 0 : habit.total);
                }}
            />
        </DismissableScrollView>
    );
};

export default ViewScreen;
