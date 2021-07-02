import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsDrawer from 'Components/SettingsDrawer/SettingsDrawer';
import { useOnboarded } from 'Context/AppContext';
import AppNavigation from 'Navigation/AppNavigation/AppNavigation';
import React, { FC } from 'react';
import { RootParamsList } from './RootNavigation.params';

const Drawer = createDrawerNavigator<RootParamsList>();

const RootNavigation: FC = () => {
    const [onboarded] = useOnboarded();

    console.log(onboarded);

    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: 'slide', overlayColor: 'none', headerShown: false }}
            drawerContent={() => <SettingsDrawer />}
        >
            <Drawer.Screen name="App" component={AppNavigation} />
        </Drawer.Navigator>
    );
};

export default RootNavigation;
