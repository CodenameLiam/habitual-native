import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import React from 'react';
import { View } from 'react-native';
import { IdeaNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface IdeasHeaderProps {
    colour: string;
    navigation: IdeaNavProps;
}

const handleBack = (navigation: IdeaNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const IdeasHeader = ({ colour, navigation }: IdeasHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerStyle: { height: heightPercentageToDP(7.2) },
    headerTitle: 'Habit Ideas',
});

export default IdeasHeader;
