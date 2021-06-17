import ArrowControls from 'Components/ArrowControls/ArrowControls';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import { useHabits } from 'Context/AppContext';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Gradients } from 'Styles/Colours';
import { YearlyTitle } from './ViewScreen.styles';
import YearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import { ViewNavProps, ViewRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { getProgress } from 'Helpers/Habits';
import { getDateArray } from 'Helpers/Dates';
import ViewCircle from 'Modules/ViewModules/ViewCircle/ViewCircle';
import ViewProgressButton from 'Modules/ViewModules/ViewProgressButton/ViewProgressButton';
import ViewCalendar from 'Modules/ViewModules/ViewCalendar/ViewCalendar';

interface ViewScreenProps {
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

const ViewScreen: React.FC<ViewScreenProps> = ({ navigation, route }) => {
    // Params
    const { id, dateIndex } = route.params;

    // Habit
    const [habits, dispatchHabits] = useHabits();
    const habit = habits[id];

    // Mounting
    const mountRef = useRef(false);
    const [ready, setReady] = useState(false);
    InteractionManager.runAfterInteractions(() => {
        setReady(true);
    });

    // Updating header information if habit is updated
    useEffect(() => {
        // Only update after initial render
        mountRef.current &&
            navigation.setOptions({
                headerBackground: () => <HeaderBackground colour={habit.colour} />,
                headerTitle: habit.name,
            });
        mountRef.current = true;
    }, [navigation, habit.colour, habit.name]);

    // State
    const [currentDateIndex, setCurrentDateIndex] = useState(dateIndex - 6);

    // Memoized values
    const currentDateMoment = useMemo(() => moment().add(currentDateIndex, 'd'), [currentDateIndex]);
    const currentDateString = useMemo(() => currentDateMoment.format('YYYY-MM-DD'), [currentDateMoment]);
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);
    const progress = useMemo(() => getProgress(habit, currentDateString), [habit, currentDateString]);

    // Playing reference
    const playingRef = useRef<boolean>(false);

    return (
        <DismissableScrollView navigation={navigation}>
            <ScrollView>
                <ArrowControls
                    title={currentDateMoment.format('MMM Do YYYY')}
                    colour={gradient.solid}
                    onLeftPress={() => setCurrentDateIndex(currentDateIndex - 1)}
                    onRightPress={() => setCurrentDateIndex(currentDateIndex + 1)}
                    rightDisabled={currentDateString === moment().format('YYYY-MM-DD')}
                    onTitlePress={() => setCurrentDateIndex(0)}
                />
                <ViewCircle
                    progress={progress}
                    total={habit.total}
                    colour={gradient.solid}
                    type={habit.type}
                    playingRef={playingRef}
                />
                <ViewProgressButton
                    habit={habit}
                    dispatchHabits={dispatchHabits}
                    colour={gradient.solid}
                    progress={progress}
                    date={currentDateString}
                    playingRef={playingRef}
                    navigation={navigation}
                />
                <YearlyTitle>Yearly Progress</YearlyTitle>
                <YearlyCalendar
                    habit={habit}
                    colour={gradient.solid}
                    yearArray={getDateArray(moment().subtract(364, 'd'), moment())}
                />

                {ready && (
                    <ViewCalendar
                        habit={habit}
                        dispatchHabits={dispatchHabits}
                        colour={gradient.solid}
                        playingRef={playingRef}
                    />
                )}

                {/* <StatsModule
                    habit={habit}
                    colour={gradient.solid}
                    sortedDates={sortedDates}
                    markedDates={markedDates}
                /> */}

                {/* {isReady && (
                    <CalendarModule
                        colour={gradient.solid}
                        habit={habit}
                        updateHabit={updateHabit}
                        markedDates={markedDates}
                        setMonth={setMonth}
                    />
                )} */}
            </ScrollView>
        </DismissableScrollView>
    );
};

export default ViewScreen;
