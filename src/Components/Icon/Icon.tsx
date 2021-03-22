import React from 'react';
import { View, StyleProp, TextStyle } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export interface IconProps {
    family?:
        | 'fontawesome'
        | 'fontawesome5'
        | 'entypo'
        | 'material'
        | 'materialcommunity'
        | 'feather'
        | 'antdesign'
        | 'ion';
    name: any;
    size: number;
    colour: string;
    style?: StyleProp<TextStyle>;
}

const Icon: React.FC<IconProps> = ({ family, name, size, colour, style }) => {
    switch (family) {
        case 'entypo':
            return <Entypo name={name} size={size} color={colour} style={style} />;
        case 'fontawesome':
            return <FontAwesome name={name} size={size} color={colour} style={style} />;
        case 'fontawesome5':
            return <FontAwesome5 name={name} size={size} color={colour} style={style} />;
        case 'material':
            return <MaterialIcons name={name} size={size} color={colour} style={style} />;
        case 'materialcommunity':
            return <MaterialCommunityIcons name={name} size={size} color={colour} style={style} />;
        case 'feather':
            return <Feather name={name} size={size} color={colour} style={style} />;
        case 'antdesign':
            return <AntDesign name={name} size={size} color={colour} style={style} />;
        case 'ion':
            return <Ionicons name={name} size={size} color={colour} style={style} />;
        default:
            return <View />;
    }
};

export default Icon;
