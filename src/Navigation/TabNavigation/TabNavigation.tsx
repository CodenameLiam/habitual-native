import React, { useLayoutEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import { useTheme } from '@emotion/react';
import HomeScreen from 'Screens/Home/HomeScreen';
import CalendarScreen from 'Screens/Calendar/CalendarScreen';
import TrendsScreen from 'Screens/Trends/TrendsScreen';
import AwardsScreen from 'Screens/Awards/AwardsScreen';
import { getHeaderTitle } from 'Helpers/HeaderTitle';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { TabParamList, HomeRouteProps } from './TabNavigation.params';
import getCustomTabs from 'Components/CustomTabs/CustomTabs';
import { heightPercentageToDP } from 'react-native-responsive-screen';

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
                    itemInnerSpace={15}
                    tabs={CustomTabs}
                    iconSize={heightPercentageToDP(2.5)}
                    preset="flashy"
                    style={{ backgroundColor: theme.background, height: heightPercentageToDP(12) }}
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
