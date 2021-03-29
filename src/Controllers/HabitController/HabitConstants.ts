import { v4 } from 'uuid';
import { getRandomColour } from 'Styles/Colours';
import { IHabit, ISchedule } from './HabitController';

export const EVERYDAY_SCHEDULE: ISchedule = {
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: true,
    SUN: true,
};

export const WEEKDAY_SCHEDULE: ISchedule = {
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: false,
    SUN: false,
};

export const WEEKEND_SCHEDULE: ISchedule = {
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: true,
    SUN: true,
};

export const DEFAULT_HABIT: IHabit = {
    id: v4(),
    name: '',
    icon: { family: 'fontawesome5', name: 'icons' },
    colour: getRandomColour(),
    total: 1,
    type: 'count',
    dates: {},
    schedule: EVERYDAY_SCHEDULE,
};
