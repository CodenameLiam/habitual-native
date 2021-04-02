import Icon from 'Components/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IdeasIconProps {
    colour: string;
    handlePress: () => void;
}

const IdeasIcon: React.FC<IdeasIconProps> = ({ colour, handlePress }) => {
    return (
        <TouchableOpacity style={{ padding: 10, paddingRight: 16 }} onPress={handlePress}>
            <Icon family="antdesign" name="appstore-o" size={28} colour={colour} />
        </TouchableOpacity>
    );
};

export default IdeasIcon;
