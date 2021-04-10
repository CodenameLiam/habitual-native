import { useTheme } from '@emotion/react';
import { IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, ViewStyle, InteractionManager } from 'react-native';
import { CalendarCell, CalendarContainer } from './YearlyCalendar.styles';

// Constants
const getYearArray = (fromStart?: boolean, yearIndex?: number): string[] =>
    Array.from(Array(fromStart && moment().add(yearIndex, 'year').isLeapYear() ? 366 : 365)).map((value, index) => {
        if (fromStart) {
            return moment().add(yearIndex, 'year').startOf('year').add(index, 'd').format('YYYY-MM-DD');
        } else {
            return moment().add(yearIndex, 'year').subtract(364, 'd').add(index, 'd').format('YYYY-MM-DD');
        }
    });

interface YearlyCalendarProps {
    style?: ViewStyle;
    habit: IHabit;
    colour: string;
    fromStart?: boolean;
    yearIndex?: number;
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

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({ style, habit, colour, fromStart, yearIndex }) => {
    const theme = useTheme();
    const yearArray = useMemo(() => getYearArray(fromStart, yearIndex), [fromStart, yearIndex]);

    const getColour = useCallback(
        (day: string) => {
            return habit.dates[day] && habit.dates[day].progress > 0
                ? colour + getAlphaValue(habit, day)
                : theme.disabled;
        },
        [colour, habit, theme.disabled],
    );

    return (
        <CalendarContainer style={style}>
            {yearArray.map((day, index) => (
                <CalendarCell key={day} colour={getColour(day)} />
            ))}
        </CalendarContainer>
    );
};

export default YearlyCalendar;
