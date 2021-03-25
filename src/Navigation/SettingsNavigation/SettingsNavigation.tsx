import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeType } from 'Controllers/ThemeController';
import React, { SetStateAction } from 'react';
import AppNavigation from '../AppNavigation/AppNavigation';
import { SettingsParamList } from '../Params';
import SettingsNavigationContent from './SettingsNavigationContent';

const Drawer = createDrawerNavigator<SettingsParamList>();

export interface SettingsNavigationProps {
    darkTheme: boolean;
    setTheme: (theme: ThemeType) => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ darkTheme, setTheme }) => {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: 'slide', overlayColor: 'none', headerShown: false }}
            drawerContent={() => <SettingsNavigationContent darkTheme={darkTheme} setTheme={setTheme} />}
        >
            <Drawer.Screen name="App" component={AppNavigation} />
        </Drawer.Navigator>
    );
};

export default SettingsNavigation;
