import { Dimensions } from 'react-native';

export const isTablet = (): boolean => {
    return Dimensions.get('screen').width > 600;
};
