import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import SettingsNavigation from 'Navigation/SettingsNavigation/SettingsNavigation';
import { DarkTheme, LightTheme, NavDarkTheme, NavLightTheme } from 'Styles/Themes';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from 'Controllers/ThemeController';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
    const { darkTheme, setTheme, loadingTheme } = useTheme();

    useEffect(() => {
        if (!loadingTheme) {
            SplashScreen.hide();
        }
    }, [loadingTheme]);

    return (
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
            <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
            <NavigationContainer theme={darkTheme ? NavDarkTheme : NavLightTheme}>
                <SettingsNavigation darkTheme={darkTheme ?? false} setTheme={setTheme} />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
