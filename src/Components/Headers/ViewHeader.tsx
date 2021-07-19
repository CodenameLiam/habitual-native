import { StackNavigationOptions } from '@react-navigation/stack';
import { ViewNavProps, ViewRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import EditIcon from 'Components/HeaderIcons/EditIcon';
import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import BackgroundTimer from 'react-native-background-timer';
import { timeAlert } from 'Helpers/TimeAlert';
import { heightPercentageToDP } from 'react-native-responsive-screen';
interface ViewHeaderProps {
    colour: string;
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

export const handleBack = (navigation: ViewNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

export const handleTimeBack = (navigation: ViewNavProps): void => {
    ReactNativeHapticFeedback.trigger('impactLight');
    timeAlert(() => {
        navigation.goBack();
        BackgroundTimer.stopBackgroundTimer();
    });
};

const handleEdit = (navigation: ViewNavProps, route: ViewRouteProps): void => {
    navigation.navigate('Build', { id: route.params.id, colour: route.params.colour });
    ReactNativeHapticFeedback.trigger('impactLight');
};

const ViewHeader = ({ colour, navigation, route }: ViewHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <HeaderBackground colour={route.params.colour} />,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerRight: () => <EditIcon colour={colour} handlePress={() => handleEdit(navigation, route)} />,
    headerStyle: { height: heightPercentageToDP(7.2) },
    headerTitle: route.params.name,
});

export default ViewHeader;
