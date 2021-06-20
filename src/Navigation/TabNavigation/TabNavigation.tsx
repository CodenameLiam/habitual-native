import React, { FC, useLayoutEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabColours } from '../../Styles/Colours';
import AnimatedTabBar, { FlashyTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import { useTheme } from '@emotion/react';
import HomeScreen from 'Screens/Home/HomeScreen';
import CalendarScreen from 'Screens/Calendar/CalendarScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TrendsScreen from 'Screens/Trends/TrendsScreen';
import AwardsScreen from 'Screens/Awards/AwardsScreen';
import { Text, View } from 'react-native';
import { getCustomTabs } from 'Helpers/HeaderTabs';
import { getHeaderTitle } from 'Helpers/HeaderTitle';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { TabParamList, HomeRouteProps } from './TabNavigation.params';

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavigationProps {
    navigation: TabNavProps;
    route: HomeRouteProps;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ navigation, route }) => {
    const theme = useTheme();

    const CustomTabs = useMemo(() => getCustomTabs(theme.text), [theme]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }, [navigation, route]);

    return (
        <Tab.Navigator
            tabBar={props => (
                <AnimatedTabBar
                    tabs={CustomTabs}
                    preset="flashy"
                    style={{ backgroundColor: theme.background }}
                    {...props}
                />
            )}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Trends" component={TrendsScreen} />
            {/* <Tab.Screen name="Awards" component={AwardsScreen} /> */}
        </Tab.Navigator>
    );
};

export default TabNavigation;
