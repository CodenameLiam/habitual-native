import { HabitObject, Habits, HabitDate } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------------
interface InitAction {
    type: 'INIT';
    payload: Habits;
}

interface AddAction {
    type: 'ADD';
    payload: HabitObject;
}

interface DeleteAction {
    type: 'DELETE';
    payload: string;
}

interface NameAction {
    type: 'NAME';
    payload: string;
    id: string;
}

interface TotalAction {
    type: 'TOTAL';
    payload: number;
    id: string;
}

interface Progress {
    type: 'PROGRESS';
    payload: HabitDate;
    id: string;
    date: string;
    complete: boolean;
}

export type HabitAction = InitAction | AddAction | DeleteAction | NameAction | TotalAction | Progress;

// ------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------
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
