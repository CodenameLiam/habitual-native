// import { IHabit, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { isScheduled } from 'Helpers/Habits';
import { HabitObject } from 'Types/Habit.types';

// Messages that will display depending on the status of the trend
export const trendMessages = {
    notEnoughData: 'To unlock this trend, make progress on this habit for a total of 3 months. You can do it!',
    grow: "You've been making great progress on this habit. Well done, keep it up!",
    loss: 'Try to get this habit back on track. You can do this! Every small step counts.',
};

// An array of all days in the year
const yearArray = Array.from(Array(365)).map((value, index) => moment().subtract(index, 'd'));

interface ChartStats {
    threeMonthAchieved: number;
    threeMonthTotal: number;
    threeMonthPercentage: number;
    yearAchieved: number;
    yearTotal: number;
    yearPercentage: number;
}

export const getChartStats = (habit: HabitObject): ChartStats => {
    const threeMonthPoint = moment().subtract(90, 'day');

    let threeMonthAchieved = 0;
    let threeMonthTotal = 0;
    let yearAchieved = 0;
    let yearTotal = 0;

    yearArray.forEach(date => {
        if (isScheduled(habit, date) === true) {
            const day = date.format('YYYY-MM-DD');

            if (habit.dates[day] && habit.dates[day].progress >= habit.dates[day].total) {
                if (date.isSameOrAfter(threeMonthPoint)) {
                    threeMonthAchieved += 1;
                }
                yearAchieved += 1;
            }

            if (date.isSameOrAfter(threeMonthPoint)) {
                threeMonthTotal += 1;
            }
            yearTotal += 1;
        }
    });

    const threeMonthPercentage = Math.round((threeMonthAchieved / threeMonthTotal) * 10000) / 100;
    const yearPercentage = Math.round((yearAchieved / yearTotal) * 10000) / 100;

    return { threeMonthAchieved, threeMonthTotal, threeMonthPercentage, yearAchieved, yearTotal, yearPercentage };
};
