import { ThemeProvider } from '@emotion/react';
import useStorage, { DEFAULT_COLOUR, DEFAULT_HABITS, DEFAULT_ONBOARDED, DEFAULT_THEME } from 'Hooks/useStorage';
import React, { createContext, Dispatch, FC, useContext, useEffect, Fragment } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { DarkTheme, LightTheme, NavDarkTheme, NavLightTheme } from 'Styles/Themes';
import { NavigationContainer } from '@react-navigation/native';
import { Colour } from 'Types/Colour.types';
import { Habits } from 'Types/Habit.types';
import { Theme } from 'Types/Theme.types';
import { HabitAction } from 'Reducers/HabitsReducer/HabitReducer.actions';

interface AppContextState {
    habits: [Habits, Dispatch<HabitAction>];
    theme: [Theme, Dispatch<Theme>];
    colour: [Colour, Dispatch<Colour>];
    onboarded: [boolean, Dispatch<boolean>];
}

const DEFAULT_APP_STATE: AppContextState = {
    habits: [DEFAULT_HABITS, () => {}],
    theme: [DEFAULT_THEME, () => {}],
    colour: [DEFAULT_COLOUR, () => {}],
    onboarded: [DEFAULT_ONBOARDED, () => {}],
};

export const AppContext = createContext<AppContextState>(DEFAULT_APP_STATE);

/* Provides context for the application */
export const AppContextProvider: FC = ({ children }) => {
    const {
        loading,
        habits,
        dispatchHabits,
        theme,
        dispatchTheme,
        colour,
        dispatchColour,
        onboarded,
        dispatchOnboarded,
    } = useStorage();
    const dark = theme === 'DARK';

    useEffect(() => {
        if (!loading) {
            SplashScreen.hide();
        }
    }, [loading]);

    if (loading) return <Fragment></Fragment>;

    return (
        <AppContext.Provider
            value={{
                theme: [theme, dispatchTheme],
                colour: [colour, dispatchColour],
                habits: [habits, dispatchHabits],
                onboarded: [onboarded, dispatchOnboarded],
            }}
        >
            <ThemeProvider theme={dark ? DarkTheme : LightTheme}>
                <StatusBar barStyle={dark || !onboarded ? 'light-content' : 'dark-content'} />
                <NavigationContainer theme={dark ? NavDarkTheme : NavLightTheme}>{children}</NavigationContainer>
            </ThemeProvider>
        </AppContext.Provider>
    );
};

/* Obtains habits from the context */
export const useHabits = (): [Habits, (action: HabitAction) => void] => {
    return useContext(AppContext).habits;
};

/* Obtains habits from the context */
export const useTheme = (): [Theme, (action: Theme) => void] => {
    return useContext(AppContext).theme;
};

/* Obtains habits from the context */
export const useColour = (): [Colour, (action: Colour) => void] => {
    return useContext(AppContext).colour;
};

/* Obtains onboarded status from the context */
export const useOnboarded = (): [boolean, (action: boolean) => void] => {
    return useContext(AppContext).onboarded;
};
