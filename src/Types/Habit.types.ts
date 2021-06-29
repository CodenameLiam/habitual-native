import { HabitIcon } from 'Components/Icon/Icon.types';
import { Colour } from './Colour.types';

/* A collection of habits */
export interface Habits {
    [id: string]: HabitObject;
}

/* An individual habit */
export interface HabitObject {
    id: string;
    name: string;
    total: number;
    colour: Colour;
    icon: HabitIcon;
    type: HabitType;
    dates: HabitDates;
    schedule: Schedule;
    reminders: HabitReminder[];
}

/* The type of habit */
export type HabitType = 'count' | 'time';

/* A collection of habit dates */
export interface HabitDates {
    [date: string]: HabitDate;
}

/* An individual entry for a habit date */
export interface HabitDate {
    progress: number;
    total: number;
}

/* Reminders for a given habit */
export interface HabitReminder {
    hour: number;
    minute: number;
    time: 'am' | 'pm';
}

/* A schedule for a habit */
export interface Schedule {
    MON: boolean;
    TUE: boolean;
    WED: boolean;
    THU: boolean;
    FRI: boolean;
    SAT: boolean;
    SUN: boolean;
}

/* Possible values for the schedule */
export type ScheduleType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
