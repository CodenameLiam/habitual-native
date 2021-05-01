import React from 'react';
import { useDrawerStatus } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AppNavProps, AppParamList } from '../Params';
import { Dimensions } from 'react-native';
import TabNavigation from '../TabNavigation';
import { useTheme } from '@emotion/react';
import TabHeader from './Headers/TabHeader';
import ViewHeader from './Headers/ViewHeader';
import { headerTitle } from './AppNavigation.styles';
import BuildScreen from 'Screens/BuildScreen/BuildScreen';
import IconScreen from 'Screens/Icon/IconScreen';
import IconHeader from './Headers/IconHeader';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import IdeasHeader from './Headers/IdeasHeader';
import ViewScreen from 'Screens/View/ViewScreen';
import CreateHeader from './Headers/CreateHeader';
import IdeasScreen from 'Screens/Ideas/IdeasScreen';
import CategoryScreen from 'Screens/Category/CategoryScreen';
import CategoryHeader from './Headers/CategoryHeader';
import { Categories } from 'Components/Category/Category.constants';
import IndividualTrendScreen from 'Screens/IndividualTrend/IndividualTrendScreen';
import TrendHeader from './Headers/TrendHeader';

const Stack = createStackNavigator<AppParamList>();

interface AppNavigationProps {
    navigation: AppNavProps;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ navigation }) => {
    const theme = useTheme();
    const colour = theme.text;

    const isDrawerOpen = useDrawerStatus();
    const active = isDrawerOpen === 'open';

    const handleSettings = (): void => {
        navigation.toggleDrawer();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <Stack.Navigator
            mode="modal"
            initialRouteName="Tabs"
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
                name="View"
                component={ViewScreen}
                options={({ navigation, route }) => ViewHeader({ colour, navigation, route })}
            />
            <Stack.Screen
                name="Build"
                component={BuildScreen}
                options={({ navigation, route }) => CreateHeader({ colour, navigation, route })}
            />
            <Stack.Screen
                name="Icon"
                component={IconScreen}
                options={({ navigation }) => IconHeader({ colour, navigation })}
            />
            <Stack.Screen
                name="Ideas"
                component={IdeasScreen}
                options={({ navigation }) => IdeasHeader({ colour, navigation })}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={({ navigation, route }) =>
                    CategoryHeader({ colour, navigation, title: Categories[route.params.category].name })
                }
            />
            <Stack.Screen
                name="IndividualTrend"
                component={IndividualTrendScreen}
                options={({ navigation, route }) => TrendHeader({ colour, navigation, route })}
            />
        </Stack.Navigator>
    );
};

export default AppNavigation;
