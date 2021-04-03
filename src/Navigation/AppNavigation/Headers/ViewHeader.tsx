import { StackNavigationOptions } from '@react-navigation/stack';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import BackIcon from 'Navigation/Components/BackIcon';
import EditIcon from 'Navigation/Components/EditIcon';
import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React from 'react';
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
    navigation.navigate('Build', { id: route.params.id, colour: route.params.colour });
    ReactNativeHapticFeedback.trigger('impactLight');
};

const ViewHeader = ({ colour, navigation, route }: ViewHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <HeaderBackground colour={route.params.colour} />,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerRight: () => <EditIcon colour={colour} handlePress={() => handleEdit(navigation, route)} />,
    headerStyle: { height: 60 },
    headerTitle: route.params.name,
});

export default ViewHeader;
