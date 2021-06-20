import { getValue, getData } from 'Controllers/StorageController';
import { useState, useEffect, useReducer, Dispatch } from 'react';
import colourReducer from 'Reducers/ColourReducer/ColourReducer';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import habitsReducer from 'Reducers/HabitsReducer/HabitsReducer';
import themeReducer from 'Reducers/ThemeReducer/ThemeReducer';
import { Colour } from 'Types/Colour.types';
import { Habits } from 'Types/Habit.types';
import { Theme } from 'Types/Theme.types';

/* Storage keys for local storage values */
export const THEME_KEY = '@Theme';
export const COLOUR_KEY = '@Colour';
export const HABITS_KEY = '@Habits';
export const DATES_KEY = '@Dates';

/* Default local storage values */
export const DEFAULT_THEME: Theme = 'LIGHT';
export const DEFAULT_COLOUR: Colour = 'GREEN';
export const DEFAULT_HABITS: Habits = {};

interface UseStorage {
    loading: boolean;
    theme: Theme;
    dispatchTheme: Dispatch<Theme>;
    colour: Colour;
    dispatchColours: Dispatch<Colour>;
    habits: Habits;
    dispatchHabits: Dispatch<HabitAction>;
}

/*
 * Returns all values from local storage, using default values if they have not been set
 */
const useStorage = (): UseStorage => {
    const [loading, setLoading] = useState<boolean>(true);

    const [theme, dispatchTheme] = useReducer(themeReducer, DEFAULT_THEME);
    const [colour, dispatchColours] = useReducer(colourReducer, DEFAULT_COLOUR);
    const [habits, dispatchHabits] = useReducer(habitsReducer, DEFAULT_HABITS);

    useEffect(() => {
        (async (): Promise<void> => {
            const theme = (await getValue(THEME_KEY)) as Theme;
            const colour = (await getValue(COLOUR_KEY)) as Colour;
            const habits = (await getData(HABITS_KEY)) as Habits;

            theme && dispatchTheme(theme);
            colour && dispatchColours(colour);
            habits && dispatchHabits(habitActions.init(habits));

            setLoading(false);
        })();
    }, []);

    return { loading, theme, dispatchTheme, colour, dispatchColours, habits, dispatchHabits };
};

export default useStorage;
