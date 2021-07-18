import { Gradients } from 'Styles/Colours';
import { EVERYDAY_SCHEDULE } from 'Types/Habit.constants';
import { HabitObject } from 'Types/Habit.types';

/* Initial habit object */
export const Habit: HabitObject = {
    id: 'onboard',
    name: 'Learn Habitual',
    icon: { family: 'materialcommunity', name: 'school' },
    total: 1,
    colour: 'TANGERINE',
    type: 'count',
    dates: {},
    schedule: { ...EVERYDAY_SCHEDULE },
    reminders: [],
    order: 1,
};

/* Habit gradient */
export const gradient = Gradients[Habit.colour];

/* Delay function */
export const delay = (duration: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), duration);
    });
};
