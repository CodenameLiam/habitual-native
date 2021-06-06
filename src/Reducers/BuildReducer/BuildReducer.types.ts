import { Colour } from 'Types/Colour.types';
import { HabitObject, Schedule, ScheduleType } from 'Types/Habit.types';

interface InitAction {
    type: 'INIT';
    payload: HabitObject;
}

interface NameAction {
    type: 'NAME';
    payload: string;
}

interface TotalAction {
    type: 'TOTAL';
    payload: number;
}

interface ColourAction {
    type: 'COLOUR';
    payload: Colour;
}

interface ScheduleAction {
    type: 'SCHEDULE';
    payload: Schedule;
}

interface DayAction {
    type: 'DAY';
    payload: boolean;
    day: ScheduleType;
}

export type BuildAction = InitAction | NameAction | TotalAction | ColourAction | ScheduleAction | DayAction;
