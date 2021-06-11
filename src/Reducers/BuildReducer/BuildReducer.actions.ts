import { HabitIcon } from 'Components/Icon/Icon.types';
import { Colour } from 'Types/Colour.types';
import { Schedule, ScheduleType } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------------
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

interface IconAction {
    type: 'ICON';
    payload: HabitIcon;
}

export type BuildAction = NameAction | TotalAction | ColourAction | ScheduleAction | DayAction | IconAction;

// ------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------
export const buildActions = {
    name: (name: string): BuildAction => ({
        type: 'NAME',
        payload: name,
    }),
    colour: (colour: Colour): BuildAction => ({
        type: 'COLOUR',
        payload: colour,
    }),
    schedule: (schedule: Schedule): BuildAction => ({
        type: 'SCHEDULE',
        payload: schedule,
    }),
    day: (value: boolean, day: ScheduleType): BuildAction => ({
        type: 'DAY',
        payload: value,
        day: day,
    }),
    total: (value: number): BuildAction => ({
        type: 'TOTAL',
        payload: value,
    }),
    icon: (icon: HabitIcon): BuildAction => ({
        type: 'ICON',
        payload: icon,
    }),
};
