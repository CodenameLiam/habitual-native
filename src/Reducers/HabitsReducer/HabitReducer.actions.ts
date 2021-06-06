import { HabitObject, Habits, HabitDate } from 'Types/Habit.types';
import { HabitAction } from './HabitsReducer.types';

export const habitActions = {
    init: (habits: Habits): HabitAction => ({
        type: 'INIT',
        payload: habits,
    }),
    add: (habit: HabitObject): HabitAction => ({
        type: 'ADD',
        payload: habit,
    }),
    progress: (id: string, date: string, progress: number, total: number, complete: boolean): HabitAction => ({
        type: 'PROGRESS',
        payload: { progress, total },
        id,
        date,
        complete,
    }),
    delete: (id: string): HabitAction => ({ type: 'DELETE', payload: id }),
};
