import { TabsConfig, FlashyTabBarItemConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import React from 'react';
import { TabColours } from 'Styles/Colours';
import { fontFamilyBold } from 'Styles/Fonts';

export const getCustomTabs = (colour: string): TabsConfig<FlashyTabBarItemConfig> => {
    return {
        Home: {
            labelStyle: {
                color: TabColours.HOME,
                fontFamily: fontFamilyBold,
            },
            icon: {
                component: () => <Icon family="feather" name="home" size={20} colour={colour} />,
                color: TabColours.HOME,
            },
        },
        Calendar: {
            labelStyle: {
                color: TabColours.CALENDAR,
                fontFamily: fontFamilyBold,
            },
            icon: {
                component: () => <Icon family="feather" name="calendar" size={20} colour={colour} />,
                color: TabColours.CALENDAR,
            },
        },
        Trends: {
            labelStyle: {
                color: TabColours.TRENDS,
                fontFamily: fontFamilyBold,
            },
            icon: {
                component: () => <Icon family="entypo" name="line-graph" size={20} colour={colour} />,
                color: TabColours.TRENDS,
            },
        },
        Awards: {
            labelStyle: {
                color: TabColours.AWARDS,
                fontFamily: fontFamilyBold,
            },
            icon: {
                component: () => <Icon family="feather" name="award" size={20} colour={colour} />,
                color: TabColours.AWARDS,
            },
        },
    };
};
