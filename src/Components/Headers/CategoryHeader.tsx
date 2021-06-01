import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { CategoryNavProps } from 'Navigation/Params';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import React from 'react';
import { View } from 'react-native';

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
    headerStyle: { height: 60 },
    headerTitle: title.replace('\n', ' '),
});

export default CategoryHeader;
