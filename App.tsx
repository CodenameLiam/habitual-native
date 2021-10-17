import React, { FC } from 'react';
import { AppContextProvider } from 'Context/AppContext';
import { enableScreens } from 'react-native-screens';
import RootNavigation from 'Navigation/RootNavigation/RootNavigation';
import 'react-native-console-time-polyfill';
import { Platform, UIManager } from 'react-native';
enableScreens();

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: FC = () => {
    return (
        <AppContextProvider>
            <RootNavigation />
        </AppContextProvider>
    );
};

export default App;
