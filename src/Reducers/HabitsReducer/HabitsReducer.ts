import { Habits } from 'Types/Habit.types';
import { HabitAction } from './HabitReducer.actions';
import { HABITS_KEY } from 'Hooks/useStorage';
import { storeData } from 'Controllers/StorageController';
import produce from 'immer';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { getSortedHabits, scheduleNotifications } from 'Helpers/Habits';
import PushNotification from 'react-native-push-notification';

const habitsReducer = produce((state: Habits, action: HabitAction) => {
    switch (action.type) {
        case 'INIT':
            state = action.payload;
            break;
        case 'CREATE':
            if (action.payload.order === 0) {
                state[action.payload.id] = { ...action.payload, order: Object.keys(state).length + 1 };
            } else {
                state[action.payload.id] = action.payload;
            }
            ReactNativeHapticFeedback.trigger('notificationSuccess');
            scheduleNotifications(state);
            break;
        case 'DELETE':
            delete state[action.payload];
            getSortedHabits(state).forEach((habit, index) => {
                state[habit.id].order = index + 1;
            });
            break;
        case 'TOGGLE':
            state[action.id].dates[action.date] = action.payload;
            ReactNativeHapticFeedback.trigger(action.complete ? 'notificationSuccess' : 'impactLight');
            break;
        case 'TIME':
            if (state[action.id].dates[action.date]) {
                state[action.id].dates[action.date].progress += 1;
                state[action.id].dates[action.date].total = action.payload.total;
                if (state[action.id].dates[action.date].progress === action.payload.total) {
                    ReactNativeHapticFeedback.trigger('notificationSuccess');
                    PushNotification.localNotification({
                        title: state[action.id].name,
                        message: "You've met your goal for this timed habit!",
                    });
                }
            } else {
                state[action.id].dates[action.date] = action.payload;
            }
            break;
        case 'PROGRESS':
            state[action.id].dates[action.date] = action.payload;
            action.feedback &&
                ReactNativeHapticFeedback.trigger(action.complete ? 'notificationSuccess' : 'impactMedium');
            break;
        case 'ORDER':
            action.payload.forEach(value => {
                state[value.id].order = value.order;
            });
            break;
    }
    storeData(HABITS_KEY, state);
    return state;
});

export default habitsReducer;
