import { HabitObject, Habits, HabitDate, HabitReminder } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------------
interface InitAction {
    type: 'INIT';
    payload: Habits;
}

interface CreateAction {
    type: 'CREATE';
    payload: HabitObject;
}

interface DeleteAction {
    type: 'DELETE';
    payload: string;
}

interface AddAction {
    type: 'ADD';
    id: string;
    date: string;
    payload: HabitDate;
    complete: boolean;
}

interface SubtractAction {
    type: 'SUBTRACT';
    id: string;
    date: string;
    payload: HabitDate;
}

interface ToggleAction {
    type: 'TOGGLE';
    id: string;
    date: string;
    payload: HabitDate;
    complete: boolean;
}

interface TimeAction {
    type: 'TIME';
    id: string;
    date: string;
    payload: HabitDate;
    complete: boolean;
}

interface ProgressAction {
    type: 'PROGRESS';
    payload: HabitDate;
    id: string;
    date: string;
    complete: boolean;
    feedback?: boolean;
}

export type HabitAction =
    | InitAction
    | CreateAction
    | DeleteAction
    | ProgressAction
    | AddAction
    | SubtractAction
    | ToggleAction
    | TimeAction;

// ------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------
export const habitActions = {
    init: (habits: Habits): HabitAction => ({
        type: 'INIT',
        payload: habits,
    }),
    create: (habit: HabitObject): HabitAction => ({
        type: 'CREATE',
        payload: habit,
    }),
    add: (habit: HabitObject, date: string): HabitAction => ({
        type: 'ADD',
        id: habit.id,
        date,
        payload: { progress: habit.dates[date] ? habit.dates[date].progress + 1 : 1, total: habit.total },
        complete: habit.dates[date] && habit.dates[date].progress + 1 >= habit.total,
    }),
    subtract: (habit: HabitObject, date: string): HabitAction => ({
        type: 'SUBTRACT',
        id: habit.id,
        date,
        payload: { progress: habit.dates[date] ? habit.dates[date].progress - 1 : 0, total: habit.total },
    }),
    toggle: (habit: HabitObject, date: string): HabitAction => ({
        type: 'TOGGLE',
        id: habit.id,
        date,
        payload: {
            progress: habit.dates[date]
                ? habit.dates[date].progress >= habit.dates[date].total
                    ? 0
                    : habit.total
                : habit.total,
            total: habit.total,
        },
        complete: habit.dates[date] ? habit.dates[date].progress < habit.total : true,
    }),
    time: (habit: HabitObject, date: string): HabitAction => ({
        type: 'TIME',
        id: habit.id,
        date,
        payload: { progress: 1, total: habit.total },
        complete: habit.dates[date] && habit.dates[date].progress + 1 >= habit.total,
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
