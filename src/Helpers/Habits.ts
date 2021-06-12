import produce from 'immer';
import moment from 'moment';
import { MarkedDateCustomStyles } from 'react-native-calendars';
import { HabitDates, HabitObject, Schedule, ScheduleType } from 'Types/Habit.types';
import { getDateArray, today } from './Dates';

// ------------------------------------------------------------------------------------------------
// Basic
// ------------------------------------------------------------------------------------------------
// Returns the progress of the habit for a given date
export const getProgress = (habit: HabitObject, date: string): number => {
    return habit.dates[date]?.progress ?? 0;
};

// Gets the alpha value for animating the view circle
export const getAlpha = (progress: number, total: number): number => {
    return Math.min(progress / total, 1);
};

// ------------------------------------------------------------------------------------------------
// Calendar
// ------------------------------------------------------------------------------------------------
interface CalendarDate {
    marked?: boolean;
    disabled?: boolean;
    selected?: boolean;
    customStyles?: Partial<MarkedDateCustomStyles>;
}

interface CalendarDates {
    [date: string]: CalendarDate;
}

// Gets a list of the disabled dates in a three month range
const getDisabledDates = (habit: HabitObject, month: string): string[] => {
    if (Object.values(habit.schedule).some(schedule => schedule === true)) {
        const start = moment(month).subtract(1, 'month').startOf('month');
        const end = moment(month).add(1, 'month').endOf('month');
        return getDateArray(start, end)
            .filter(date => habit.schedule[date.format('ddd').toUpperCase() as ScheduleType] === false)
            .map(date => date.format('YYYY-MM-DD'));
    } else {
        return [];
    }
};

// Gets dates to be marked on the calendar
export const getCalendarDates = (habit: HabitObject, month: string): CalendarDates => {
    const calendarDates: CalendarDates = Object.fromEntries(
        Object.entries(habit.dates)
            .filter(date => date[1].progress >= date[1].total)
            .map(date => [date[0], { selected: true, customStyles: { container: { borderRadius: 10 } } }]),
    );

    calendarDates[today] = { ...calendarDates[today], marked: true };
    getDisabledDates(habit, month).forEach(date => (calendarDates[date] = { ...calendarDates[date], disabled: true }));
    return calendarDates;
};

// // Returns habit date entires sorted in ascending order
// export const getSortedDates = (dates: HabitDates): HabitDates => {
//     return Object.keys(dates)
//         .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
//         .reduce((obj: HabitDates, key) => {
//             obj[key] = dates[key];
//             return obj;
//         }, {});
// };

// interface MarkedDate {
//     selected: boolean;
//     customStyles: MarkedDateCustomStyles;
//     marked?: boolean;
// }

// interface MarkedDates {
//     [date: string]: MarkedDate;
// }

// // Gets
// export const getMarkedDates = (habit: HabitObject): void => {
//     console.log(Object.values(getSortedDates(habit.dates)));

//     // return {...getSortedDates(habit.dates)}
// };
