import Card from 'Components/Card/Card';
import Icon from 'Components/Icon';
import { IconFamily } from 'Components/Icon/Icon.types';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Styles from './BuildIcon.styles';

interface BuildIconProps {
    onPress: () => void;
    family: IconFamily;
    name: string;
    colour: string;
}

const BuildIcon: FC<BuildIconProps> = ({ onPress, family, name, colour }) => {
    return (
        <Styles.TouchableIcon onPress={onPress} style={{ aspectRatio: 1 }}>
            <Icon family={family} name={name} size={heightPercentageToDP(3.5)} colour={colour} />
        </Styles.TouchableIcon>
    );
};

export default BuildIcon;
