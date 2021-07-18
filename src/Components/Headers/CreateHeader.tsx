import React from 'react';
import { View } from 'react-native';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import IdeasIcon from 'Components/HeaderIcons/IdeasIcon';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { BuildNavProps, BuildRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { StackNavigationOptions } from '@react-navigation/stack';
import { heightPercentageToDP } from 'react-native-responsive-screen';

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
    headerStyle: { height: heightPercentageToDP(7.2) },
    headerTitle: route.params.id ? 'Edit Habit' : 'Create Habit',
});

export default CreateHeader;
