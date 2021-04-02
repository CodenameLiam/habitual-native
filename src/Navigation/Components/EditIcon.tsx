import Icon from 'Components/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface EditIconProps {
    colour: string;
    handlePress: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({ colour, handlePress }) => {
    return (
        <TouchableOpacity style={{ padding: 10, paddingRight: 16 }} onPress={handlePress}>
            <Icon family="feather" name="edit" size={28} colour={colour} />
        </TouchableOpacity>
    );
};

export default EditIcon;
