import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colour } from 'Types/Colour.types';
import { HabitObject } from 'Types/Habit.types';

// ------------------------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------------------------
// View the current habit
export const handleView = (navigation: TabNavProps, habit: HabitObject, dateIndex: number): void => {
    navigation.navigate('View', { id: habit.id, name: habit.name, colour: habit.colour, dateIndex });
    ReactNativeHapticFeedback.trigger('impactLight');
};

// Returns the progress of the habit for a given date
export const getProgress = (habit: HabitObject, date: string): number => {
    return habit.dates[date]?.progress ?? 0;
};

// ------------------------------------------------------------------------------------------------
// Gestures
// ------------------------------------------------------------------------------------------------
export const HabitMaxInterpolation = Dimensions.get('screen').width - 120;
export const HabitMaxTransformInterpolation = Dimensions.get('screen').width / 20.5;

export const normaliseProgress = (translationX: number, total: number, tempProgress: number): number => {
    const interpolateX = translationX / HabitMaxInterpolation;
    const scaledX = interpolateX * total;
    const progress = tempProgress + scaledX;
    return Math.min(Math.max(progress, 0), total);
};
