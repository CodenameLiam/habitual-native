import Icon from 'Components/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BackIconProps {
    colour: string;
    handlePress: () => void;
}

const BackIcon: React.FC<BackIconProps> = ({ colour, handlePress }) => {
    return (
        <TouchableOpacity style={{ paddingLeft: 8 }} onPress={handlePress}>
            <Icon family="feather" name="chevron-left" size={36} colour={colour} />
        </TouchableOpacity>
    );
};

export default BackIcon;
