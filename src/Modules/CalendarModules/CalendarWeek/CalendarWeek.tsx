import { useTheme } from '@emotion/react';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import { getDateArray } from 'Helpers/Dates';
import moment from 'moment';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Dispatch, FC, useMemo, useState } from 'react';
import { View } from 'react-native';
import { HabitAction } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { Full } from 'Styles/Globals';
import { Habits } from 'Types/Habit.types';
import { WeekCell, WeekDayContainer, WeekDayText } from './CalendarWeek.styles';
import MemoizedCalendarWeekHabit from './CalendarWeekHabit';

interface CalendarWeekProps {
    habits: Habits;
    dispatchHabits: Dispatch<HabitAction>;
    colour: string;
    navigation: TabNavProps;
}

const CalendarWeek: FC<CalendarWeekProps> = ({ habits, dispatchHabits, colour, navigation }) => {
    const theme = useTheme();

    const [weekIndex, setWeekIndex] = useState<number>(0);
    const weekStart = useMemo(() => moment().add(weekIndex, 'w').startOf('isoWeek'), [weekIndex]);
    const weekEnd = useMemo(() => moment().add(weekIndex, 'w').endOf('isoWeek'), [weekIndex]);
    const dates = useMemo(() => getDateArray(weekStart.clone(), weekEnd.clone()), [weekEnd, weekStart]);

    return (
        <View style={Full}>
            <ArrowControls
                colour={colour}
                title={`${weekStart.format('MMM Do')} - ${weekEnd.format('MMM Do, YYYY')}`}
                onLeftPress={() => setWeekIndex(weekIndex - 1)}
                onRightPress={() => setWeekIndex(weekIndex + 1)}
                onTitlePress={() => setWeekIndex(0)}
                rightDisabled={weekIndex === 0}
            />
            <WeekDayContainer>
                {dates.map(day => (
                    <WeekCell key={day.format('l')} disabled={true} colour={theme.card}>
                        <WeekDayText>{day.format('dd')[0]}</WeekDayText>
                    </WeekCell>
                ))}
            </WeekDayContainer>
            <GrowScrollView>
                {Object.values(habits).map(habit => (
                    <MemoizedCalendarWeekHabit
                        key={habit.id}
                        habit={habit}
                        dispatchHabits={dispatchHabits}
                        dates={dates}
                        navigation={navigation}
                    />
                ))}
            </GrowScrollView>
        </View>
    );
};

export default CalendarWeek;
