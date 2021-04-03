import { useTheme } from '@emotion/react';
import { IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CalendarCell, CalendarContainer } from './YearlyCalendar.styles';

// Constants
const yearDateArray = Array.from(Array(365)).map((value, index) =>
    moment().subtract(364, 'd').add(index, 'd').format('YYYY-MM-DD'),
);

interface YearlyCalendarProps {
    habit: IHabit;
    colour: string;
}

const getAlphaValue = (habit: IHabit, day: string): number | string => {
    let value: number | string = habit.dates[day]
        ? habit.dates[day].progress >= habit.dates[day].progressTotal
            ? 1
            : habit.dates[day].progress / habit.dates[day].progressTotal
        : 1;

    value = (Math.round(value * 10) / 10) * 100;
    if (value <= 10) value = 20;
    if (value === 100) value = '';

    return value;
};

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({ habit, colour }) => {
    const theme = useTheme();

    const getColour = useCallback(
        (day: string) => {
            return habit.dates[day] && habit.dates[day].progress > 0
                ? colour + getAlphaValue(habit, day)
                : theme.disabled;
        },
        [colour, habit, theme.disabled],
    );

    return (
        <CalendarContainer>
            {yearDateArray.map((day, index) => {
                return <CalendarCell key={day} colour={getColour(day)} />;
            })}
        </CalendarContainer>
    );
};

export default YearlyCalendar;
