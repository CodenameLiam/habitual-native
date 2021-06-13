import { Habits } from 'Types/Habit.types';
import { HabitAction } from './HabitReducer.actions';
import { HABITS_KEY } from 'Hooks/useStorage';
import { storeData } from 'Controllers/StorageController';
import produce from 'immer';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

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
        case 'PROGRESS':
            state[action.id].dates[action.date] = action.payload;
            action.feedback &&
                ReactNativeHapticFeedback.trigger(action.complete ? 'notificationSuccess' : 'impactMedium');
            break;
    }
    storeData(HABITS_KEY, state);
    return state;
});

export default habitsReducer;
