import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import EditIcon from 'Navigation/Components/EditIcon';
import IdeasIcon from 'Navigation/Components/IdeasIcon';
import { BuildNavProps, ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React from 'react';
import { View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ViewHeaderProps {
    colour: string;
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

const handleBack = (navigation: ViewNavProps): void => {
    navigation.navigate('Tabs');
    ReactNativeHapticFeedback.trigger('impactLight');
};

const handleEdit = (navigation: ViewNavProps, route: ViewRouteProps): void => {
    navigation.navigate('Build', { id: route.params.id });
    ReactNativeHapticFeedback.trigger('impactLight');
};

const ViewHeader = ({ colour, navigation, route }: ViewHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerRight: () => <EditIcon colour={colour} handlePress={() => handleEdit(navigation, route)} />,
    headerStyle: { height: 60 },
    headerTitle: 'View',
});

export default ViewHeader;
