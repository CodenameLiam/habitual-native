import { IHabit } from './HabitController';

type HabitActions = 'name' | 'icon';

type Action = {
    type: HabitActions;
    payload: Partial<IHabit>;
};

export const habitReducer = (habit: IHabit, action: Action): IHabit => {
    switch (action.type) {
        case 'name':
            return { ...habit, name: action.payload.name! };
        case 'icon':
            return { ...habit, icon: action.payload.icon! };
        default:
            return habit;
    }
};
