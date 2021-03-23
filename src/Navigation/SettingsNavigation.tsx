import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View, Text } from 'react-native';
import AppNavigation from './AppNavigation';
import { SettingsParamList } from './types';

const Drawer = createDrawerNavigator<SettingsParamList>();

const SettingsNavigation: React.FC = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: 'front', overlayColor: 'none', headerShown: false }}
            drawerContent={() => (
                <View>
                    <Text>Poop</Text>
                </View>
            )}
        >
            <Drawer.Screen name="App" component={AppNavigation} />
        </Drawer.Navigator>
    );
};

export default SettingsNavigation;
