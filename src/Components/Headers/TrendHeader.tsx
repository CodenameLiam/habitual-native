import { StackNavigationOptions } from '@react-navigation/stack';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { StatsNavProps, StatsRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';

import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface TrendHeaderProps {
    colour: string;
    navigation: StatsNavProps;
    route: StatsRouteProps;
}

const handleBack = (navigation: StatsNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const TrendHeader = ({ colour, navigation, route }: TrendHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <HeaderBackground colour={route.params.colour} />,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerStyle: { height: heightPercentageToDP(7.2) },
    headerTitle: route.params.name,
});

export default TrendHeader;
