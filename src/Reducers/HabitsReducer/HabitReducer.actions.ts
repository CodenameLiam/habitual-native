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
    feedback?: boolean;
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
    progress: (
        habit: HabitObject,
        date: string,
        progress: number,
        complete: boolean,
        feedback: boolean = true,
    ): HabitAction => ({
        type: 'PROGRESS',
        payload: { progress, total: habit.total },
        id: habit.id,
        date,
        complete,
        feedback,
    }),
    delete: (id: string): HabitAction => ({ type: 'DELETE', payload: id }),
};
