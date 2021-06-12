import { getRandomColour } from 'Helpers/RandomColour';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { HabitObject, Schedule } from './Habit.types';

export const EVERYDAY_SCHEDULE: Schedule = {
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: true,
    SUN: true,
};

export const WEEKDAY_SCHEDULE: Schedule = {
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: false,
    SUN: false,
};

export const WEEKEND_SCHEDULE: Schedule = {
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: true,
    SUN: true,
};

export const DEFAULT_HABIT: HabitObject = {
    id: v4(),
    name: '',
    icon: { family: 'fontawesome5', name: 'icons' },
    colour: getRandomColour(),
    total: 1,
    type: 'count',
    dates: {},
    schedule: EVERYDAY_SCHEDULE,
};
