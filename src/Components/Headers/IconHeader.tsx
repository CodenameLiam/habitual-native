import { StackNavigationOptions } from '@react-navigation/stack';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { IconNavProps } from 'Navigation/Params';

import React from 'react';
import { View } from 'react-native';

interface IconHeaderProps {
    colour: string;
    navigation: IconNavProps;
}

const IconHeader = ({ colour, navigation }: IconHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View></View>,
    headerLeft: () => <BackIcon colour={colour} handlePress={() => navigation.navigate('Build', {})} />,
    headerStyle: { height: 60 },
    headerTitle: 'Select Icon',
});

export default IconHeader;
