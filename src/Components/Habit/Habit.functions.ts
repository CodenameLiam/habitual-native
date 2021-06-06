import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colour } from 'Types/Colour.types';
import { HabitObject } from 'Types/Habit.types';

// View the current habit
export const handleView = (navigation: TabNavProps, id: string, name: string, colour: Colour, date: string): void => {
    navigation.navigate('View', { id, name, colour, date });
    ReactNativeHapticFeedback.trigger('impactLight');
};

// Returns the
export const getProgress = (habit: HabitObject, date: string): number => {
    return habit.dates[date]?.progress ?? 0;
};
