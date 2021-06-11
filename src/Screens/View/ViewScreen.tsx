import ArrowControls from 'Components/ArrowControls/ArrowControls';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import { AppContext, useHabits } from 'Context/AppContext';
// import { getProgress } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
// import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Gradients } from 'Styles/Colours';
import CircleModule from './Modules/CircleModule';
import ProgressButtonModule from './Modules/ProgressButtonModule';
import { YearlyTitle } from './ViewScreen.styles';
// import CalendarModule, { getMarkedDates, sortDates, today } from './Modules/CalendarModule';
import YearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import StatsModule from './Modules/StatsModule';
import { ViewNavProps, ViewRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
// import { getProgress } from 'Components/Habit/Habit.functions';
import { getCalendarDates, getProgress } from 'Helpers/Habits';
import { today } from 'Helpers/Dates';
// import { today } from './Modules/CalendarModule';

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
    const readyRef = useRef(false);
    InteractionManager.runAfterInteractions(() => {
        readyRef.current = true;
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
    const [currentMonth, setCurrentMonth] = useState(today);

    // Memoized values
    const currentDateMoment = useMemo(() => moment().add(currentDateIndex, 'd'), [currentDateIndex]);
    const currentDateString = useMemo(() => currentDateMoment.format('YYYY-MM-DD'), [currentDateMoment]);
    const calendarDates = useMemo(() => getCalendarDates(habit, currentMonth), [currentMonth, habit]);
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);
    const progress = useMemo(() => getProgress(habit, currentDateString), [habit, currentDateString]);

    // Calendar

    // const [month, setMonth] = useState(today);

    console.time('sort');
    // const sortedDates = getSortedDates(habit.dates);
    console.log(calendarDates);
    // const markedDates = getMarkedDates(habit);

    console.timeEnd('sort');
    // const sortedDates = useMemo(() => sortDates(Object.keys(habit.dates)), [habit.dates]);
    // const markedDates = useMemo(() => getMarkedDates(habit, month, sortedDates), [habit, month, sortedDates]);

    // Progress and animations
    // const [progress, setProgress] = useState(getProgress(habit, date));

    // Updating progress if date is changed
    // useEffect(() => {
    //     setProgress(getProgress(habit, date));
    // }, [habit, date]);

    return (
        <DismissableScrollView navigation={navigation}>
            <ScrollView>
                <ArrowControls
                    title={currentDateMoment.format('MMM Do YYYY')}
                    colour={gradient.solid}
                    onLeftPress={() => setCurrentDateIndex(currentDateIndex - 1)}
                    onRightPress={() => setCurrentDateIndex(currentDateIndex + 1)}
                    rightDisabled={currentDateString === moment().format('YYYY-MM-DD')}
                />
                {/* <CircleModule progress={progress} total={habit.total} colour={gradient.solid} /> */}
                {/* <ProgressButtonModule
                    progress={progress}
                    setProgress={setProgress}
                    date={date}
                    colour={gradient.solid}
                    habit={habit}
                    updateHabit={updateHabit}
                /> */}
                <YearlyTitle>Yearly Progress</YearlyTitle>
                {/* <YearlyCalendar
                    habit={habit}
                    colour={gradient.solid}
                    yearArray={Array.from(Array(365))}
                    yearStart={moment().add(1, 'day').subtract(1, 'year')}
                /> */}

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
