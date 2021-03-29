import { IHabit } from './HabitController';

type HabitActions = 'name' | 'icon' | 'colour' | 'schedule' | 'total' | 'type';

export type Action = {
    type: HabitActions;
    payload: Partial<IHabit>;
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
        default:
            return habit;
    }
};
