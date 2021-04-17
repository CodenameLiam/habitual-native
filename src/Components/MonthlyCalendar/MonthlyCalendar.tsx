import { useTheme } from '@emotion/react';
import { getAlphaValue } from 'Components/YearlyCalendar/YearlyCalendar';
import { IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import MonthModule from 'Screens/Calendar/Modules/MonthModule';
import { RowBetween } from 'Styles/Globals';
import { MonthCell, MonthlyCalendarContainer } from './MonthlyCalendar.styles';

const getMonthArray = (monthIndex: number): string[] =>
    Array.from(Array(moment().add(monthIndex, 'month').daysInMonth())).map((value, index) =>
        moment().add(monthIndex, 'month').startOf('month').add(index, 'd').format('YYYY-MM-DD'),
    );

interface MonthlyCalendarProps {
    habit: IHabit;
    colour: string;
    monthIndex: number;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ habit, colour, monthIndex }) => {
    const theme = useTheme();
    const monthArray = useMemo(() => getMonthArray(monthIndex), [monthIndex]);

    const getColour = useCallback(
        (day: string) => {
            return habit.dates[day] && habit.dates[day].progress > 0 ? colour + getAlphaValue(habit, day) : theme.card;
        },
        [colour, habit, theme.card],
    );

    return (
        <MonthlyCalendarContainer>
            {monthArray.map(day => (
                <MonthCell key={day} colour={getColour(day)} />
            ))}
        </MonthlyCalendarContainer>
    );
};

export default MonthlyCalendar;
