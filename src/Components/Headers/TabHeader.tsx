import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import Icon from 'Components/Icon';
import SettingsDrawerIcon from 'Components/SettingsDrawer/SettingsDrawerIcon';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface TabHeaderProps {
    active: boolean;
    colour: string;
    navigation: TabNavProps;
    handleSettings: () => void;
}

const handleBuild = (navigation: TabNavProps): void => {
    navigation.navigate('Build', {});
    ReactNativeHapticFeedback.trigger('impactMedium');
};

const TabHeader = ({ active, colour, navigation, handleSettings }: TabHeaderProps): StackNavigationOptions => ({
    headerBackground: () => <View />,
    headerLeft: () => (
        <TouchableOpacity style={{ paddingLeft: 25 }} onPress={handleSettings}>
            <SettingsDrawerIcon type="cross" active={active} underlayColor="transparent" color={colour} />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 25 }} onPress={() => handleBuild(navigation)}>
            <Icon family="entypo" name="plus" size={38} colour={colour} />
        </TouchableOpacity>
    ),
    ...TransitionPresets.ModalSlideFromBottomIOS,
});

export default TabHeader;
