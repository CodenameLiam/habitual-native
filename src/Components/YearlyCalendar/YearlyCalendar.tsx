import { useTheme } from '@emotion/react';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { Moment } from 'moment';
import React from 'react';
import { ViewStyle } from 'react-native';
import { CalendarCell, CalendarContainer } from './YearlyCalendar.styles';

interface YearlyCalendarProps {
    style?: ViewStyle;
    habit: IHabit;
    colour: string;
    // fromStart?: boolean;
    yearStart: Moment;
    // yearIndex?: number;
    yearArray: string[];
}

export const getAlphaValue = (habit: IHabit, day: string): number | string => {
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

const getColour = (habit: IHabit, colour: string, disabledColour: string, index: number, yearStart: Moment): string => {
    const day = yearStart.clone().add(index, 'day').format('YYYY-MM-DD');
    if (!habit.dates[day]) {
        return disabledColour;
    }
    return habit.dates[day].progress > 0 ? colour + getAlphaValue(habit, day) : disabledColour;
};

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({ style, habit, colour, yearStart, yearArray }) => {
    const theme = useTheme();

    return (
        <CalendarContainer style={style}>
            {yearArray.map((day, index) => (
                <CalendarCell key={index} colour={getColour(habit, colour, theme.disabled, index, yearStart)} />
            ))}
        </CalendarContainer>
    );
};

export default YearlyCalendar;
