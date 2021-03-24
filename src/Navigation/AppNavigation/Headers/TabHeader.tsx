import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'Components/Icon';
import { TabNavProps } from 'Navigation/Params';
import SettingsNavigationIcon from 'Navigation/SettingsNavigation/SettingsNavigationIcon';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TabHeaderProps {
    active: boolean;
    colour: string;
    navigation: TabNavProps;
    handleSettings: () => void;
}

const TabHeader = ({ active, colour, navigation, handleSettings }: TabHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View />,
    headerLeft: () => (
        <TouchableOpacity style={{ paddingLeft: 25 }} onPress={handleSettings}>
            <SettingsNavigationIcon type="cross" active={active} underlayColor="transparent" color={colour} />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 25 }} onPress={() => navigation.navigate('Create')}>
            <Icon family="entypo" name="plus" size={38} colour={colour} />
        </TouchableOpacity>
    ),
});

export default TabHeader;
