import { IHabit, Habits, HabitDate } from 'Types/Habit.types';
import { HabitAction } from './HabitsReducer.types';

export const initHabits = (habits: Habits): HabitAction => ({
    type: 'INIT',
    payload: habits,
});

/* Add a new habit */
export const addHabit = (habit: IHabit): HabitAction => ({
    type: 'ADD',
    payload: habit,
});

/* Delete an existing habit */
export const deleteHabit = (id: string): HabitAction => ({ type: 'DELETE', payload: id });

/* Update a habits name */
export const updateHabitName = (id: string, name: string): HabitAction => ({
    type: 'NAME',
    payload: name,
    id: id,
});

export const updateHabitDate = (id: string, date: string, progress: number, total: number): HabitAction => ({
    type: 'DATE',
    payload: { progress, total },
    id: id,
    date: date,
});
