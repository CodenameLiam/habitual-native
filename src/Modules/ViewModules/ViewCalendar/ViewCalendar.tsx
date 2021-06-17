import { useTheme } from '@emotion/react';
import { today } from 'Helpers/Dates';
import { getCalendarDates } from 'Helpers/Habits';
import React, { Dispatch, FC, MutableRefObject, useEffect, useState } from 'react';
import { CalendarList, DateObject } from 'react-native-calendars';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { GreyColours } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';
import { HabitObject } from 'Types/Habit.types';
import { useDebouncedCallback } from 'use-debounce/lib';

interface ViewCalendarProps {
    colour: string;
    habit: HabitObject;
    dispatchHabits: Dispatch<HabitAction>;
    playingRef: MutableRefObject<boolean>;
}

const ViewCalendar: FC<ViewCalendarProps> = ({ habit, dispatchHabits, colour, playingRef }) => {
    const theme = useTheme();
    const [currentMonth, setCurrentMonth] = useState(today);
    const [calendarDates, setCalendarDates] = useState(getCalendarDates(habit, currentMonth));

    // Debounce calendar update function
    const updateCalendarDates = useDebouncedCallback(
        (habit: HabitObject, currentMonth: string) => setCalendarDates(getCalendarDates(habit, currentMonth)),
        1000,
    );

    // Update calendar if props change
    useEffect(() => {
        updateCalendarDates(habit, currentMonth);
    }, [habit, currentMonth, updateCalendarDates]);

    const handleCalendarPress = (e: DateObject): void => {
        console.log(e);
        playingRef.current = false;
        dispatchHabits(habitActions.toggle(habit, e.dateString));
    };

    return (
        <CalendarList
            key={colour}
            horizontal={true}
            pagingEnabled={true}
            maxDate={today}
            markedDates={calendarDates as any}
            markingType={'custom'}
            firstDay={1}
            onDayPress={handleCalendarPress}
            onVisibleMonthsChange={(months: DateObject[]) => setCurrentMonth(months[0].dateString)}
            theme={{
                calendarBackground: theme.background,
                monthTextColor: theme.text,
                dayTextColor: theme.text,
                textDisabledColor: theme.disabled,
                selectedDayTextColor: theme.text,
                selectedDotColor: theme.text,
                selectedDayBackgroundColor: colour,
                todayTextColor: colour,
                dotColor: colour,
                textMonthFontSize: 15,
                textMonthFontFamily: fontFamily,
                textMonthFontWeight: '600',
                textDayFontFamily: fontFamily,
                textDayFontWeight: '600',
                textDayHeaderFontFamily: fontFamily,
                textDayHeaderFontWeight: '600',
                textSectionTitleColor: GreyColours.GREY2,
            }}
        />
    );
};

export default ViewCalendar;
