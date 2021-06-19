import moment, { Moment } from 'moment';
import { MarkedDateCustomStyles } from 'react-native-calendars';
import { HabitDates, HabitObject, ScheduleType } from 'Types/Habit.types';
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

// Returns true if a given habit is complete on a given date
export const isComplete = (habit: HabitObject, date: string): boolean => {
    return habit.dates[date] && habit.dates[date].progress >= habit.dates[date].total;
};

interface GetTime {
    hours: number;
    minutes: number;
    formatTime: string;
}

// Gets the time string for a timed habit
export const getTime = (progress: number): GetTime => {
    const h = Math.floor(progress / 3600);
    const m = Math.floor((progress % 3600) / 60);
    const s = progress % 60;

    const hString = h > 0 ? `${h}h ` : '';
    const mString = m > 0 || (m === 0 && h === 0) ? `${m}m ` : '';
    const sString = s > 0 || (s === 0 && m === 0 && h === 0) ? `${s}s` : '';

    return { hours: h, minutes: m, formatTime: hString + mString + sString };
};

// Returns the interval for a time series habit
export const getTimeInterval = (total: number): number => {
    // If the habit is at least an hour, the time interval should be an hour too
    return total >= 3600 ? 3600 : 60;
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

export interface CalendarDates {
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

// Gets the colour for a particular date cell
export const getColour = (habit: HabitObject, date: string, colour: string, theme: string): string => {
    if (habit.dates[date]) {
        const { progress, total } = habit.dates[date];
        const alpha = (Math.round(Math.min(progress / total, 1) * 10) / 10) * 100;
        return alpha >= 100 ? colour : alpha > 0 ? colour + Math.max(alpha, 20) : theme;
    } else {
        return theme;
    }
};

// ------------------------------------------------------------------------------------------------
// Stats
// ------------------------------------------------------------------------------------------------
interface Streak {
    streak: number;
    date: Moment;
}

// Gets a habit streak total and end date from a given date
export const getStreak = (habit: HabitObject, date: Moment): Streak => {
    let streak = isComplete(habit, date.format('YYYY-MM-DD')) ? 1 : 0;
    let isStreak = true;

    while (isStreak) {
        // Subtract 1 day from the current date
        date.subtract(1, 'd');

        // If the progress for this day is greater than the total, or the habit is not scheduled for today, increment the current streak
        if (
            isComplete(habit, date.format('YYYY-MM-DD')) ||
            habit.schedule[date.format('ddd').toUpperCase() as ScheduleType] === false
        ) {
            streak++;
        } else {
            // Otherwise the streak has ended
            isStreak = false;
        }
    }

    return { streak, date };
};

// Gets the highest streak of a given habit
export const getHighestStreak = (habit: HabitObject, sortedDates: string[]): number => {
    let highestStreak = 0;
    let currentDate = moment();

    // Loop through all dates until the final date has been reached
    while (currentDate.isAfter(moment(sortedDates[0]))) {
        // Get the streak total and end date
        const { streak, date } = getStreak(habit, currentDate);
        // Updte the highest streak if required
        highestStreak = streak > highestStreak ? streak : highestStreak;
        // Update the current date
        currentDate = date;
    }

    return highestStreak;
};

// Returns habit date entires sorted in ascending order
export const getSortedDates = (dates: HabitDates): string[] => {
    return Object.keys(dates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
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
