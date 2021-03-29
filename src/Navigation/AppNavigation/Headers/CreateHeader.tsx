import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import { BuildNavProps } from 'Navigation/Params';
import React from 'react';
import { View, Text } from 'react-native';

interface CreateHeaderProps {
    colour: string;
    navigation: BuildNavProps;
}

const CreateHeader = ({ colour, navigation }: CreateHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => navigation.navigate('Tabs')} />,
    headerStyle: { height: 60 },
    headerTitle: 'Create Habit',
});

export default CreateHeader;
