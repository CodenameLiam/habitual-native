import React from 'react';
import { useDrawerStatus } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import TabNavigation from '../TabNavigation/TabNavigation';
import { useTheme } from '@emotion/react';
import TabHeader from '../../Components/Headers/TabHeader';
import ViewHeader from '../../Components/Headers/ViewHeader';
import BuildScreen from 'Screens/BuildScreen/BuildScreen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ViewScreen from 'Screens/View/ViewScreen';
import CreateHeader from '../../Components/Headers/CreateHeader';
import { headerFont } from 'Styles/Fonts';
import { AppNavProps } from 'Navigation/RootNavigation/RootNavigation.params';
import { AppParamList } from './AppNavigation.params';
import IdeasScreen from 'Screens/Ideas/IdeasScreen';
import IdeasHeader from 'Components/Headers/IdeasHeader';
import CategoryScreen from 'Screens/Category/CategoryScreen';
import { Categories } from 'Components/Category/Category.constants';
import CategoryHeader from 'Components/Headers/CategoryHeader';

const Stack = createStackNavigator<AppParamList>();

interface AppNavigationProps {
    navigation: AppNavProps;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ navigation }) => {
    // Icon colour
    const theme = useTheme();
    const colour = theme.text;

    // Settings drawer
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
                headerTitleStyle: headerFont,
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
                options={({ navigation, route }) => CreateHeader({ colour, navigation, route })}
            />
            <Stack.Screen
                name="View"
                component={ViewScreen}
                options={({ navigation, route }) => ViewHeader({ colour, navigation, route })}
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
            {/* 
           
           
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
            /> */}
        </Stack.Navigator>
    );
};

export default AppNavigation;
