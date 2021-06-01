import { StackNavigationOptions } from '@react-navigation/stack';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { IndividualTrendNavProps, IndividualTrendRouteProps } from 'Navigation/Params';
import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface TrendHeaderProps {
    colour: string;
    navigation: IndividualTrendNavProps;
    route: IndividualTrendRouteProps;
}

const handleBack = (navigation: IndividualTrendNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const TrendHeader = ({ colour, navigation, route }: TrendHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <HeaderBackground colour={route.params.colour} />,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerStyle: { height: 60 },
    headerTitle: route.params.name,
});

export default TrendHeader;
