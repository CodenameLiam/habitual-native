import { useTheme } from '@emotion/react';
// import { IHabit, mergeDates, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useCallback } from 'react';
import { CalendarList, DateObject } from 'react-native-calendars';
import { GreyColours } from 'Styles/Colours';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Constants
export const today = moment().format('YYYY-MM-DD');

// Sorts sorts in ascending order
export const sortDates = (dates: string[]): string[] => {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
};

// Returns all days in which the habit is disabled
export const getDisabledDays = (habit: IHabit): number[] => {
    const disabledDays: number[] = [];
    Object.keys(habit.schedule).forEach((day, index) => {
        if (!habit.schedule[day as ScheduleType]) {
            disabledDays.push((index + 1) % 7);
        }
    });
    return disabledDays;
};

// Returns all dates in which the habit is disabled over a three month period
const getDisabledDates = (habit: IHabit, month: string, markedDates: any): any => {
    const disabledDates: any = {};
    const start = moment(month).clone().startOf('month').subtract(1, 'month');
    const end = moment(month).clone().endOf('month').add(1, 'month');
    const daysToDisable = getDisabledDays(habit);

    if (daysToDisable.length >= 0) {
        for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
            if (daysToDisable.includes(m.day())) {
                const day = m.format('YYYY-MM-DD');
                disabledDates[day] = {
                    ...markedDates[day],
                    disabled: true,
                };
            }
        }
    }
    return disabledDates;
};

// Returns an array of marked dates for use in the calendar
export const getMarkedDates = (habit: IHabit, month: string, sortedDates: string[]): any => {
    let markedDates = Object.assign(
        {},
        ...sortedDates
            .filter(date => habit.dates[date] && habit.dates[date].progress >= habit.dates[date].progressTotal)
            .map(date => ({
                [date]: { selected: true, customStyles: { container: { borderRadius: 10 } } },
            })),
    );
    markedDates[today] = { ...markedDates[today], marked: true };
    markedDates = { ...markedDates, ...getDisabledDates(habit, month, markedDates) };

    return markedDates;
};

interface CalendarModuleProps {
    habit: IHabit;
    colour: string;
    markedDates: any;
    setMonth: React.Dispatch<React.SetStateAction<string>>;
    updateHabit: (habit: IHabit) => Promise<void>;
}

const CalendarModule: React.FC<CalendarModuleProps> = ({ habit, updateHabit, colour, markedDates, setMonth }) => {
    const theme = useTheme();

    // const handleCalendarPress = useCallback(
    //     (day: DateObject) => {
    //         const date = habit.dates[day.dateString];
    //         const newProgress = date && date.progress >= date.progressTotal ? 0 : habit.total;

    //         updateHabit({
    //             ...habit,
    //             dates: mergeDates(habit, day.dateString, newProgress),
    //         });

    //         ReactNativeHapticFeedback.trigger(newProgress === 0 ? 'impactLight' : 'notificationSuccess');
    //     },
    //     [habit, updateHabit],
    // );

    return (
        <CalendarList
            key={habit.colour}
            horizontal={true}
            pagingEnabled={true}
            maxDate={today}
            markedDates={markedDates}
            // onDayPress={handleCalendarPress}
            markingType={'custom'}
            firstDay={1}
            onVisibleMonthsChange={(months: DateObject[]) => setMonth(months[0].dateString)}
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
                textMonthFontFamily: 'Montserrat',
                textMonthFontWeight: '600',
                textDayFontFamily: 'Montserrat',
                textDayFontWeight: '600',
                textDayHeaderFontFamily: 'Montserrat',
                textDayHeaderFontWeight: '600',
                textSectionTitleColor: GreyColours.GREY2,
            }}
        />
    );
};

export default CalendarModule;
