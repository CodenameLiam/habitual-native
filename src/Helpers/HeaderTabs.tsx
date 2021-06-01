import { TabsConfig, FlashyTabBarItemConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import React from 'react';
import { TabColours } from 'Styles/Colours';

export const getCustomTabs = (colour: string): TabsConfig<FlashyTabBarItemConfig> => {
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
