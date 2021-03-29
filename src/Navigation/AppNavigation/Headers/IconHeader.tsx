import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Navigation/Components/BackIcon';
import { IconNavProps } from 'Navigation/Params';

import React from 'react';
import { View } from 'react-native';

interface CreateHeaderProps {
    colour: string;
    navigation: IconNavProps;
}

const IconHeader = ({ colour, navigation }: CreateHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => navigation.navigate('Build', {})} />,
    headerStyle: { height: 60 },
    headerTitle: 'Select Icon',
});

export default IconHeader;
