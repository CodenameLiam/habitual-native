import { HabitObject, HabitDate, Habits } from 'Types/Habit.types';

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
