import Icon from 'Components/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface BackIconProps {
    colour: string;
    handlePress: () => void;
}

const BackIcon: React.FC<BackIconProps> = ({ colour, handlePress }) => {
    return (
        <TouchableOpacity style={{ paddingLeft: 8 }} onPress={handlePress}>
            <Icon family="feather" name="chevron-left" size={heightPercentageToDP(3.5)} colour={colour} />
        </TouchableOpacity>
    );
};

export default BackIcon;
