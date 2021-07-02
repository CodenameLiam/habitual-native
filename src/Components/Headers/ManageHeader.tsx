import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { ManageNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React from 'react';
import { View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ManageHeaderProps {
    colour: string;
    navigation: ManageNavProps;
}

const handleBack = (navigation: ManageNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const ManageHeader = ({ colour, navigation }: ManageHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerStyle: { height: 60 },
    headerTitle: 'Manage Habits',
});

export default ManageHeader;
