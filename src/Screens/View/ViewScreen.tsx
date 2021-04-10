import { useTheme } from '@emotion/react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import Icon from 'Components/Icon';
import { AppContext } from 'Context/AppContext';
import {
    getProgress,
    IHabit,
    ISchedule,
    mergeDates,
    provideFeedback,
    ScheduleType,
} from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, InteractionManager, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { GradientColours, GreyColours } from 'Styles/Colours';
import { Row } from 'Styles/Globals';
import CircleModule from './Modules/CircleModule';
import ProgressButtonModule from './Modules/ProgressButtonModule';
import { YearlyTitle } from './ViewScreen.styles';
import { CalendarList, DateObject } from 'react-native-calendars';
import CalendarModule, { getMarkedDates, sortDates, today } from './Modules/CalendarModule';
import YearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import StatsModule from './Modules/StatsModule';

interface ViewScreenProps {
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

const ViewScreen: React.FC<ViewScreenProps> = ({ navigation, route }) => {
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

    const [month, setMonth] = useState(today);
    const sortedDates = useMemo(() => sortDates(Object.keys(habit.dates)), [habit.dates]);
    const markedDates = useMemo(() => getMarkedDates(habit, month, sortedDates), [habit, month, sortedDates]);

    // Progress and animations
    const [progress, setProgress] = useState(getProgress(habit, date));

    // Updating progress if date is changed
    useEffect(() => {
        setProgress(getProgress(habit, date));
    }, [habit, date]);

    return (
        <DismissableScrollView navigation={navigation}>
            <ScrollView>
                <ArrowControls
                    title={currentDate.format('MMM Do YYYY')}
                    colour={gradient.solid}
                    onLeftPress={() => setCurrentDateIndex(currentDateIndex - 1)}
                    onRightPress={() => setCurrentDateIndex(currentDateIndex + 1)}
                    rightDisabled={date === moment().format('YYYY-MM-DD')}
                />
                <CircleModule progress={progress} total={habit.total} colour={gradient.solid} />
                <ProgressButtonModule
                    progress={progress}
                    setProgress={setProgress}
                    date={date}
                    colour={gradient.solid}
                    habit={habit}
                    updateHabit={updateHabit}
                />
                <YearlyTitle>Yearly Progress</YearlyTitle>
                <YearlyCalendar habit={habit} colour={gradient.solid} />

                <StatsModule
                    habit={habit}
                    colour={gradient.solid}
                    sortedDates={sortedDates}
                    markedDates={markedDates}
                />

                {isReady && (
                    <CalendarModule
                        colour={gradient.solid}
                        habit={habit}
                        updateHabit={updateHabit}
                        markedDates={markedDates}
                        setMonth={setMonth}
                    />
                )}
            </ScrollView>
        </DismissableScrollView>
    );
};

export default ViewScreen;
