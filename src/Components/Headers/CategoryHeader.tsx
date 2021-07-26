import React from 'react';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { CategoryNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface CategoryHeaderProps {
    colour: string;
    navigation: CategoryNavProps;
    title: string;
}

const handleBack = (navigation: CategoryNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const CategoryHeader = ({ colour, navigation, title }: CategoryHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerStyle: { height: heightPercentageToDP(7.2) },
    headerTitle: title.replace('\n', ' '),
});

export default CategoryHeader;
