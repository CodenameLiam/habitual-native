import { weekArray } from 'Helpers/Dates';
import moment, { Moment } from 'moment';
import { HabitObject, Habits, ScheduleType } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------------------------

// Returns true if no habits exist
export const emptyHabits = (habits: Habits): boolean => Object.keys(habits).length < 1;

// Gets the habits for a specified date
export const getDateHabits = (habits: Habits, date: Moment): HabitObject[] => {
    return Object.values(habits).filter(
        habit => habit.schedule[date.format('ddd').toUpperCase() as ScheduleType] === true,
    );
};

// Gets the ratio of habits completed for a specified date
export const getDateComplete = (habits: HabitObject[], date: string): number => {
    if (habits.length < 1) return 0;
    const completeHabits = habits.filter(
        habit => habit.dates[date] && habit.dates[date].progress >= habit.dates[date].total,
    );
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
        return getDateComplete(dateHabits, date.format('YYYY-MM-DD'));
    });

    return { todaysHabits, alphaWeekArray };
};

// // Gets the alpga value for a selected date
// const getAlphaValue = (habits: IHabit[], selectedDate: string): number => {
//     const completeHabits = habits.filter(
//         habit =>
//             habit.dates[selectedDate] && habit.dates[selectedDate].progress >= habit.dates[selectedDate].progressTotal,
//     );
//     return completeHabits.length === 0 ? 1 : 1 - completeHabits.length / habits.length;
// };

// // Gets all of the alpha values for each habit
// const getAllAlphaValues = (habits: IAllHabits): number[] => {
//     return prevDates.map(date => {
//         const selectedDateHabits = getSelectedDateHabits(habits, date);
//         return getAlphaValue(selectedDateHabits, date.format('YYYY-MM-DD'));
//     });
// };
