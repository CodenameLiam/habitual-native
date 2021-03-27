import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import SettingsNavigation from 'Navigation/SettingsNavigation/SettingsNavigation';
import { DarkTheme, LightTheme, NavDarkTheme, NavLightTheme } from 'Styles/Themes';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from 'Controllers/ThemeController';
import { StatusBar } from 'react-native';
import { useHabits } from 'Controllers/HabitController';
import { AppContext } from 'Context/AppContext';
import { useColours } from 'Controllers/ColourController';

const App: React.FC = () => {
    const { darkTheme, updateTheme, loadingTheme } = useTheme();
    const { loadingHabits, habits, updateHabit, deleteHabit } = useHabits();
    const { loadingColour, colour, updateColour } = useColours();

    const AppContextValue = { habits, updateHabit, deleteHabit, colour, updateColour };

    useEffect(() => {
        if (!loadingTheme && !loadingHabits && !loadingColour) {
            SplashScreen.hide();
        }
    }, [loadingTheme, loadingHabits, loadingColour]);

    return (
        <AppContext.Provider value={AppContextValue}>
            <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
                <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
                <NavigationContainer theme={darkTheme ? NavDarkTheme : NavLightTheme}>
                    <SettingsNavigation darkTheme={darkTheme} setTheme={updateTheme} />
                </NavigationContainer>
            </ThemeProvider>
        </AppContext.Provider>
    );
};

export default App;
