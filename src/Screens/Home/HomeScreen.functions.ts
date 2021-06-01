import { Moment } from 'moment';
import { IHabit, Habits, ScheduleType } from 'Types/Habit.types';

// Gets the habits for a selected date
export const getDateHabits = (habits: Habits, date: Moment): IHabit[] => {
    return Object.values(habits).filter(
        habit => habit.schedule[date.format('ddd').toUpperCase() as ScheduleType] === true,
    );
};

export const getAlphaValue = (habit: IHabit, date: string): void => {
    const { progress, total } = habit.dates[date];
};
