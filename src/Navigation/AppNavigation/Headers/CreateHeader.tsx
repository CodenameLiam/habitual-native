import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import IdeasIcon from 'Navigation/Components/IdeasIcon';
import { BuildNavProps } from 'Navigation/Params';
import React from 'react';
import { View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface CreateHeaderProps {
    colour: string;
    navigation: BuildNavProps;
}

const handleBack = (navigation: BuildNavProps): void => {
    navigation.goBack();
    ReactNativeHapticFeedback.trigger('impactLight');
};

const handleIdeas = (navigation: BuildNavProps): void => {
    navigation.navigate('Ideas');
    ReactNativeHapticFeedback.trigger('impactLight');
};

const CreateHeader = ({ colour, navigation }: CreateHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => handleBack(navigation)} />,
    headerRight: () => <IdeasIcon colour={colour} handlePress={() => handleIdeas(navigation)} />,
    headerStyle: { height: 60 },
    headerTitle: 'Create Habit',
});

export default CreateHeader;
