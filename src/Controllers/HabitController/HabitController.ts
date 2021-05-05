import { IconProps } from 'Components/Icon';
import { useEffect, useState } from 'react';
import { IColours } from 'Styles/Colours';
import { getData, storeData } from '../StorageController';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import moment from 'moment';

const HABITS_KEY = '@Habits';

interface IHabitController {
    loadingHabits: boolean;
    habits: IAllHabits;
    updateHabit: (habit: IHabit) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
}

export const useHabits = (): IHabitController => {
    const [habits, setHabits] = useState<IAllHabits>({});
    const [loadingHabits, setLoading] = useState<boolean>(true);

    const getHabits = async (): Promise<void> => {
        const allHabits = await getData(HABITS_KEY);
        setHabits(allHabits ?? {});
        setLoading(false);
    };

    const updateHabit = async (habit: IHabit): Promise<void> => {
        const newHabits = { ...habits };
        newHabits[habit.id] = habit;

        setHabits(newHabits);
        storeData(HABITS_KEY, newHabits);
    };

    const deleteHabit = async (id: string): Promise<void> => {
        const newHabits = { ...habits };
        delete newHabits[id];

        setHabits(newHabits);
        storeData(HABITS_KEY, newHabits);
    };

    useEffect(() => {
        getHabits();
    }, []);

    return { loadingHabits, habits, updateHabit, deleteHabit };
};

export const getProgress = (habit: IHabit, selectedDate: string): number => {
    return habit.dates[selectedDate] ? habit.dates[selectedDate].progress : 0;
};

export const mergeDates = (habit: IHabit, date: string, progress: number): HabitDates => {
    return { ...habit.dates, [date]: { progressTotal: habit.total, progress: progress } };
};

export const provideFeedback = (habit: IHabit, progress: number): void => {
    progress === habit.total
        ? ReactNativeHapticFeedback.trigger('notificationSuccess')
        : ReactNativeHapticFeedback.trigger('impactMedium');
};

// export const checkAward = (habit: IHabit, date: string) => {
//     const startDate = moment(date).startOf('month');
//     console.log(startDate);
// };

export interface IAllHabits {
    [id: string]: IHabit;
}

export type HabitType = 'count' | 'time';

export interface IHabit {
    id: string;
    name: string;
    icon: Partial<IconProps>;
    colour: IColours;
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
