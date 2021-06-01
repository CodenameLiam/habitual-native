import { StackNavigationOptions } from '@react-navigation/stack';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import IdeasIcon from 'Navigation/Components/IdeasIcon';
import { BuildNavProps, BuildRouteProps } from 'Navigation/Params';
import React from 'react';
import { View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface CreateHeaderProps {
    colour: string;
    navigation: BuildNavProps;
    route: BuildRouteProps;
}

const handleBack = (navigation: BuildNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const handleIdeas = (navigation: BuildNavProps): void => {
    navigation.navigate('Ideas');
    ReactNativeHapticFeedback.trigger('impactLight');
};

const CreateHeader = ({ colour, navigation, route }: CreateHeaderProps): StackNavigationOptions => ({
    headerBackground: () => (route.params.colour ? <HeaderBackground colour={route.params.colour} /> : <View></View>),
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerRight: () => <IdeasIcon colour={colour} handlePress={() => handleIdeas(navigation)} />,
    headerStyle: { height: 60 },
    headerTitle: route.params.id ? 'Edit Habit' : 'Create Habit',
});

export default CreateHeader;
