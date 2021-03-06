import { useTheme } from '@emotion/react';
import { getColour } from 'Helpers/Habits';
import { Moment } from 'moment';
import React, { FC, memo } from 'react';
import { ViewStyle } from 'react-native';
import { HabitObject } from 'Types/Habit.types';
import { CalendarCell, CalendarContainer } from './YearlyCalendar.styles';

interface YearlyCalendarProps {
    style?: ViewStyle;
    habit: HabitObject;
    colour: string;
    yearArray: Moment[];
}

const YearlyCalendar: FC<YearlyCalendarProps> = ({ style, habit, colour, yearArray }) => {
    const theme = useTheme();

    return (
        <CalendarContainer style={style}>
            {yearArray.map((date, index) => (
                <CalendarCell
                    key={index + habit.id}
                    colour={getColour(habit, date.format('YYYY-MM-DD'), colour, theme.card)}
                />
            ))}
        </CalendarContainer>
    );
};

const MemoizedYearlyCalendar = memo(YearlyCalendar);

export default MemoizedYearlyCalendar;
