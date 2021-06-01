import React, { FC } from 'react';
import { AppContextProvider } from 'Context/AppContext';
import { enableScreens } from 'react-native-screens';
import RootNavigation from 'Navigation/RootNavigation/RootNavigation';
enableScreens();

const App: FC = () => (
    <AppContextProvider>
        <RootNavigation />
    </AppContextProvider>
);

export default App;
