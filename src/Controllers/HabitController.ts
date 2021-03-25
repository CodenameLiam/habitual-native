import { IconProps } from 'Components/Icon';
import { IGradient } from 'Styles/Colours';

export interface IAllHabits {
    [id: string]: IHabit;
}

export type HabitType = 'count' | 'time';

export interface IHabit {
    id: string;
    name: string;
    icon: Partial<IconProps>;
    colour: IGradient;
    total: number;
    type: HabitType;
    dates: HabitDates;
    schedule: ISchedule;
}

export type ScheduleType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface ISchedule {
    MON: boolean;
    TUE: boolean;
    WED: boolean;
    THU: boolean;
    FRI: boolean;
    SAT: boolean;
    SUN: boolean;
}

export interface HabitDates {
    [date: string]: HabitDateValue;
}

export interface HabitDateValue {
    progress: number;
    progressTotal: number;
}
