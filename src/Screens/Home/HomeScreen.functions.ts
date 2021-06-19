import { weekArray } from 'Helpers/Dates';
import { getSchedule } from 'Helpers/Habits';
import moment, { Moment } from 'moment';
import { HabitObject, Habits } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------------------------
// Returns true if no habits exist
export const emptyHabits = (habits: HabitObject[]): boolean => habits.length < 1;

// Gets the habits for a specified date
export const getDateHabits = (habits: Habits, date: Moment): HabitObject[] => {
    return Object.values(habits).filter(habit => getSchedule(habit, date) === true);
};

// Gets the ratio of habits completed for a specified date
export const getHabitsAlpha = (habits: HabitObject[], date: string): number => {
    if (habits.length < 1) return 0;
    const completeHabits = habits.filter(habit => habit.dates[date] && habit.dates[date].progress >= habit.total);
    return completeHabits.length === 0 ? 0 : completeHabits.length / habits.length;
};

// Gets the current title of the page
export const getHomeTitle = (dayIndex: number): string => {
    switch (dayIndex) {
        case 6:
            return 'Today';
        case 5:
            return 'Yesterday';
        default:
            return moment()
                .subtract(6 - dayIndex, 'd')
                .format('MMM Do');
    }
};

// ------------------------------------------------------------------------------------------------
// Instantiate
// ------------------------------------------------------------------------------------------------
interface HomeScreenData {
    todaysHabits: HabitObject[];
    alphaWeekArray: number[];
}

// Gets all of the data required for rendering the home screen
export const getHomeScreenData = (habits: Habits, dateIndex: number): HomeScreenData => {
    let todaysHabits: HabitObject[] = [];
    const alphaWeekArray = weekArray.map((date, index) => {
        const dateHabits = getDateHabits(habits, date);
        index === dateIndex && (todaysHabits = dateHabits);
        return getHabitsAlpha(dateHabits, date.format('YYYY-MM-DD'));
    });

    return { todaysHabits, alphaWeekArray };
};
