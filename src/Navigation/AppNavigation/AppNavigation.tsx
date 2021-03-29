import React from 'react';
import { useDrawerStatus } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AppNavProps, AppParamList } from '../Params';
import { Dimensions } from 'react-native';
import TabNavigation from '../TabNavigation';
import { useTheme } from '@emotion/react';
import TabHeader from './Headers/TabHeader';
import CreateHeader from './Headers/CreateHeader';
import { headerTitle } from './AppNavigation.styles';
import BuildScreen from 'Screens/Build/BuildScreen';
import IconScreen from 'Screens/Icon/IconScreen';
import IconHeader from './Headers/IconHeader';

const Stack = createStackNavigator<AppParamList>();

interface AppNavigationProps {
    navigation: AppNavProps;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ navigation }) => {
    const theme = useTheme();
    const colour = theme.text;

    const isDrawerOpen = useDrawerStatus();
    const active = isDrawerOpen === 'open';

    const handleSettings = (): void => navigation.toggleDrawer();

    return (
        <Stack.Navigator
            mode="modal"
            screenOptions={{
                gestureEnabled: true,
                cardOverlayEnabled: true,
                gestureResponseDistance: Dimensions.get('screen').height,
                headerTitleStyle: headerTitle,
                headerTitleAlign: 'center',
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <Stack.Screen
                name="Tabs"
                component={TabNavigation}
                options={({ navigation }) => TabHeader({ active, colour, navigation, handleSettings })}
            />
            <Stack.Screen
                name="Build"
                component={BuildScreen}
                options={({ navigation }) => CreateHeader({ colour, navigation })}
            />
            <Stack.Screen
                name="Icon"
                component={IconScreen}
                options={({ navigation }) => IconHeader({ colour, navigation })}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
