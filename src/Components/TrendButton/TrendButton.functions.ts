import { weekArray } from 'Components/TrendChart/TrendChart';

import moment, { Moment } from 'moment';
import { HabitObject } from 'Types/Habit.types';

// Gets the total number of times the habit was completed for the week
export const getWeeklyTotal = (habit: HabitObject, weekStart: Moment): number => {
    let height = 0;
    for (let i = 0; i < 7; i++) {
        const day = weekStart.clone().add(i, 'day');
        const dayString = day.format('YYYY-MM-DD');
        if (habit.dates[dayString]) {
            height = height + habit.dates[dayString].progress;
        }
    }
    return height;
};

export interface IWeeklyTotalArray {
    heights: number[];
    maxHeight: number;
    enoughData: boolean;
}

// Gets the difference between now and the first date recorded in weeks
const getStartDifferential = (sortedDates: string[]): number => {
    return moment().diff(moment(sortedDates[0]), 'weeks');
};

// Gets an array of weekly totals for the year
export const getWeeklyTotalArray = (habit: HabitObject, sortedDates: string[]): IWeeklyTotalArray => {
    const heights = weekArray.map(week => getWeeklyTotal(habit, week));
    const maxHeight = Math.max(...heights);
    const enoughData = getStartDifferential(sortedDates) >= 12;
    return { heights, maxHeight, enoughData };
};

export const getThreeMonthAverage = (weeklyTotalArray: number[]): number => {
    const threeMonthAverage = weeklyTotalArray.slice(40, 52);
    return threeMonthAverage.length > 0 ? threeMonthAverage.reduce((a, b) => a + b) / threeMonthAverage.length : 0;
};

export const getYearAverage = (weeklyTotalArray: number[], sortedDates: string[]): number => {
    const yearAverage = weeklyTotalArray.slice(52 - getStartDifferential(sortedDates), 52);
    return yearAverage.length > 0 ? yearAverage.reduce((a, b) => a + b) / yearAverage.length : 0;
};
