import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Text } from 'react-native';
import { TabParamList } from './Params';

import { TabColours } from '../Styles/Colours';
import AnimatedTabBar, { FlashyTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import { useTheme } from '@emotion/react';

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

const HomeScreen: React.FC = () => {
    return (
        <SafeAreaView>
            <Text>Home</Text>
        </SafeAreaView>
    );
};

const CalendarScreen: React.FC = () => {
    return (
        <SafeAreaView>
            <Text>Calendar</Text>
        </SafeAreaView>
    );
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation: React.FC = () => {
    const theme = useTheme();

    const CustomTabs = useMemo(() => getCustomTabs(theme.text), [theme]);

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
