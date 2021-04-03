import React, { useLayoutEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Text } from 'react-native';
import { HomeRouteProps, TabNavProps, TabParamList } from './Params';

import { TabColours } from '../Styles/Colours';
import AnimatedTabBar, { FlashyTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import { useTheme } from '@emotion/react';
import HomeScreen from 'Screens/Home/HomeScreen';
import CalendarScreen from 'Screens/Calendar/CalendarScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const getHeaderTitle = (route: HomeRouteProps): string => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Calendar':
            return 'Calendar';
        case 'Trends':
            return 'Trends';
        case 'Awards':
            return 'Awards';
        default:
            return 'Home';
    }
};

const getCustomTabs = (colour: string): TabsConfig<FlashyTabBarItemConfig> => {
    return {
        Home: {
            labelStyle: {
                color: TabColours.HOME,
                fontFamily: 'Montserrat-Bold',
            },
            icon: {
                component: () => <Icon family="feather" name="home" size={20} colour={colour} />,
                color: TabColours.HOME,
            },
        },
        Calendar: {
            labelStyle: {
                color: TabColours.CALENDAR,
                fontFamily: 'Montserrat-Bold',
            },
            icon: {
                component: () => <Icon family="feather" name="calendar" size={20} colour={colour} />,
                color: TabColours.CALENDAR,
            },
        },
        Trends: {
            labelStyle: {
                color: TabColours.TRENDS,
                fontFamily: 'Montserrat-Bold',
            },
            icon: {
                component: () => <Icon family="entypo" name="line-graph" size={20} colour={colour} />,
                color: TabColours.TRENDS,
            },
        },
        Awards: {
            labelStyle: {
                color: TabColours.AWARDS,
                fontFamily: 'Montserrat-Bold',
            },
            icon: {
                component: () => <Icon family="feather" name="award" size={20} colour={colour} />,
                color: TabColours.AWARDS,
            },
        },
    };
};

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
            <Tab.Screen name="Trends" component={HomeScreen} />
            <Tab.Screen name="Awards" component={HomeScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigation;
