import { TabsConfig, FlashyTabBarItemConfig } from '@gorhom/animated-tabbar';
import Icon from 'Components/Icon';
import React from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { TabColours } from 'Styles/Colours';
import { fontFamilyBold } from 'Styles/Fonts';

const getCustomTabs = (colour: string): TabsConfig<FlashyTabBarItemConfig> => {
    return {
        Home: {
            labelStyle: {
                color: TabColours.HOME,
                fontFamily: fontFamilyBold,
                fontSize: heightPercentageToDP(1.8),
            },
            icon: {
                component: () => <Icon family="feather" name="home" size={heightPercentageToDP(2.5)} colour={colour} />,
                color: TabColours.HOME,
            },
        },
        Calendar: {
            labelStyle: {
                color: TabColours.CALENDAR,
                fontFamily: fontFamilyBold,
                fontSize: heightPercentageToDP(1.8),
            },
            icon: {
                component: () => (
                    <Icon family="feather" name="calendar" size={heightPercentageToDP(2.5)} colour={colour} />
                ),
                color: TabColours.CALENDAR,
            },
        },
        Trends: {
            labelStyle: {
                color: TabColours.TRENDS,
                fontFamily: fontFamilyBold,
                fontSize: heightPercentageToDP(1.8),
            },
            icon: {
                component: () => (
                    <Icon family="entypo" name="line-graph" size={heightPercentageToDP(2.5)} colour={colour} />
                ),
                color: TabColours.TRENDS,
            },
        },
        Awards: {
            labelStyle: {
                color: TabColours.AWARDS,
                fontFamily: fontFamilyBold,
                fontSize: heightPercentageToDP(1.8),
            },
            icon: {
                component: () => (
                    <Icon family="feather" name="award" size={heightPercentageToDP(2.5)} colour={colour} />
                ),
                color: TabColours.AWARDS,
            },
        },
    };
};

export default getCustomTabs;
