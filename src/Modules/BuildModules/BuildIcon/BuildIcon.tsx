import Card from 'Components/Card/Card';
import Icon from 'Components/Icon';
import { IconFamily } from 'Components/Icon/Icon.types';
import { BuildNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface BuildIconProps {
    // navigation: BuildNavProps;
    onPress: () => void;
    family: IconFamily;
    name: string;
    colour: string;
}

const BuildIcon: FC<BuildIconProps> = ({ onPress, family, name, colour }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Card>
                <Icon family={family} name={name} size={28} colour={colour} />
            </Card>
        </TouchableOpacity>
    );
};

export default BuildIcon;
