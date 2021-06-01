import { Habits } from 'Types/Habit.types';
import { HabitAction } from './HabitsReducer.types';
import produce from 'immer';
import { storeData } from 'Controllers/StorageController';
import { HABITS_KEY } from 'Hooks/useStorage';

const habitsReducer = produce((state: Habits, action: HabitAction) => {
    switch (action.type) {
        case 'INIT':
            state = action.payload;
            break;
        case 'ADD':
            state[action.payload.id] = action.payload;
            break;
        case 'DELETE':
            delete state[action.payload];
            break;
        case 'NAME':
            state[action.id].name = action.payload;
            break;
        case 'DATE':
            state[action.id].dates[action.date] = action.payload;
            break;
    }
    storeData(HABITS_KEY, state);
    return state;
});

export default habitsReducer;
