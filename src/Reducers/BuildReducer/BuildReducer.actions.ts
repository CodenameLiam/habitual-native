import { HabitIcon } from 'Components/Icon/Icon.types';
import { Colour } from 'Types/Colour.types';
import { Schedule, ScheduleType } from 'Types/Habit.types';
import { BuildAction } from './BuildReducer.types';

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
