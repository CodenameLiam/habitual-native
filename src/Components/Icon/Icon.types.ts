import { StyleProp, TextStyle } from 'react-native';

export type IconFamily =
    | 'fontawesome'
    | 'fontawesome5'
    | 'entypo'
    | 'material'
    | 'materialcommunity'
    | 'feather'
    | 'antdesign'
    | 'ion';

export interface HabitIcon {
    family: IconFamily;
    name: string;
}

export interface IconProps extends HabitIcon {
    size: number;
    colour: string;
    style?: StyleProp<TextStyle>;
}
