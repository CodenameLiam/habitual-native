import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { SetStateAction } from 'react';
import AppNavigation from '../AppNavigation/AppNavigation';
import { SettingsParamList } from '../Params';
import SettingsNavigationContent from './SettingsNavigationContent';

const Drawer = createDrawerNavigator<SettingsParamList>();

export interface SettingsNavigationProps {
    darkTheme: boolean;
    setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ darkTheme, setDarkTheme }) => {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: 'slide', overlayColor: 'none', headerShown: false }}
            drawerContent={() => <SettingsNavigationContent darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
        >
            <Drawer.Screen name="App" component={AppNavigation} />
        </Drawer.Navigator>
    );
};

export default SettingsNavigation;
