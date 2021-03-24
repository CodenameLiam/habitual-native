import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import { CreateNavProps } from 'Navigation/Params';
import React from 'react';
import { View, Text } from 'react-native';

interface CreateHeaderProps {
    colour: string;
    navigation: CreateNavProps;
}

const CreateHeader = ({ colour, navigation }: CreateHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => navigation.navigate('Tabs')} />,
    headerStyle: { height: 60 },
});

export default CreateHeader;
