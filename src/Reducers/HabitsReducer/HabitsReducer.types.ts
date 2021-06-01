import { IHabit, HabitDate, Habits } from 'Types/Habit.types';

interface InitAction {
    type: 'INIT';
    payload: Habits;
}

interface AddAction {
    type: 'ADD';
    payload: IHabit;
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

interface DateAction {
    type: 'DATE';
    payload: HabitDate;
    id: string;
    date: string;
}

export type HabitAction = InitAction | AddAction | DeleteAction | NameAction | TotalAction | DateAction;
