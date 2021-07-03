import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValue, getData } from 'Controllers/StorageController';
import { useState, useEffect, useReducer, Dispatch } from 'react';
import colourReducer from 'Reducers/ColourReducer/ColourReducer';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import habitsReducer from 'Reducers/HabitsReducer/HabitsReducer';
import onboardingReducer from 'Reducers/OnboardingReducer/OnboardingReducer';
import themeReducer from 'Reducers/ThemeReducer/ThemeReducer';
import { Colour } from 'Types/Colour.types';
import { Habits } from 'Types/Habit.types';
import { Theme } from 'Types/Theme.types';

/* Storage keys for local storage values */
export const THEME_KEY = '@Theme';
export const COLOUR_KEY = '@Colour';
export const HABITS_KEY = '@Habits';
export const DATES_KEY = '@Dates';
export const ONBOARDED_KEY = '@Onboarded';

/* Default local storage values */
export const DEFAULT_THEME: Theme = 'DARK';
export const DEFAULT_COLOUR: Colour = 'GREEN';
export const DEFAULT_HABITS: Habits = {};
export const DEFAULT_ONBOARDED: boolean = false;

interface UseStorage {
    loading: boolean;
    onboarded: boolean;
    dispatchOnboarded: Dispatch<boolean>;
    theme: Theme;
    dispatchTheme: Dispatch<Theme>;
    colour: Colour;
    dispatchColour: Dispatch<Colour>;
    habits: Habits;
    dispatchHabits: Dispatch<HabitAction>;
}

/*
 * Returns all values from local storage, using default values if they have not been set
 */
const useStorage = (): UseStorage => {
    // AsyncStorage.clear();

    const [loading, setLoading] = useState<boolean>(true);

    const [theme, dispatchTheme] = useReducer(themeReducer, DEFAULT_THEME);
    const [colour, dispatchColour] = useReducer(colourReducer, DEFAULT_COLOUR);
    const [habits, dispatchHabits] = useReducer(habitsReducer, DEFAULT_HABITS);
    const [onboarded, dispatchOnboarded] = useReducer(onboardingReducer, DEFAULT_ONBOARDED);

    useEffect(() => {
        (async (): Promise<void> => {
            const theme = (await getValue(THEME_KEY)) as Theme;
            const colour = (await getValue(COLOUR_KEY)) as Colour;
            const habits = (await getData(HABITS_KEY)) as Habits;
            const onboarded = (await getValue(ONBOARDED_KEY)) === 'true';

            theme && dispatchTheme(theme);
            colour && dispatchColour(colour);
            habits && dispatchHabits(habitActions.init(habits));
            dispatchOnboarded(onboarded);

            setLoading(false);
        })();
    }, []);

    return {
        loading,
        theme,
        dispatchTheme,
        colour,
        dispatchColour,
        habits,
        dispatchHabits,
        onboarded,
        dispatchOnboarded,
    };
};

export default useStorage;
