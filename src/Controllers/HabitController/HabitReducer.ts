import { IHabit } from './HabitController';

type HabitActions = 'name' | 'icon' | 'colour' | 'schedule' | 'total' | 'type' | 'progress' | 'all';

interface Payload extends IHabit {
    date?: string;
    progress: number;
}

export type Action = {
    type: HabitActions;
    payload: Partial<Payload>;
};

export const habitReducer = (habit: IHabit, action: Action): IHabit => {
    switch (action.type) {
        case 'name':
            return { ...habit, name: action.payload.name! };
        case 'icon':
            return { ...habit, icon: action.payload.icon! };
        case 'colour':
            return { ...habit, colour: action.payload.colour! };
        case 'schedule':
            return { ...habit, schedule: action.payload.schedule! };
        case 'total':
            return { ...habit, total: action.payload.total! };
        case 'type':
            return { ...habit, type: action.payload.type! };
        case 'progress':
            return {
                ...habit,
                dates: {
                    ...habit.dates,
                    [action.payload.date!]: { progressTotal: habit.total, progress: action.payload.progress! },
                },
            };
        case 'all':
            return {
                ...habit,
                ...action.payload,
            };
        default:
            return habit;
    }
};
