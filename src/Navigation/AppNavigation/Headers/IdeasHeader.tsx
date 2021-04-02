import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import { IconNavProps } from 'Navigation/Params';

import React from 'react';
import { View } from 'react-native';

interface IdeasHeaderProps {
    colour: string;
    navigation: IconNavProps;
}

const IdeasHeader = ({ colour, navigation }: IdeasHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => navigation.navigate('Build', {})} />,
    headerStyle: { height: 60 },
    headerTitle: 'Habit Ideas',
});

export default IdeasHeader;
