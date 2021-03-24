import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import SettingsNavigation from 'Navigation/SettingsNavigation/SettingsNavigation';
import { DarkTheme, LightTheme, NavDarkTheme, NavLightTheme } from 'Styles/Themes';
import { ThemeProvider } from '@emotion/react';

const App: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
            <NavigationContainer theme={darkTheme ? NavDarkTheme : NavLightTheme}>
                <SettingsNavigation darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
