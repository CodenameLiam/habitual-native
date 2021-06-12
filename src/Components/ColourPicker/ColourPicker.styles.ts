import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const swatchDimensions = Dimensions.get('screen').width / 8 + 'px';
const smallSwatchDimensions = '32px';

export const PickerContainer = styled.View`
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 2px;
    padding-top: 5px;
`;

export const Swatch = styled(TouchableOpacity)`
    width: ${swatchDimensions};
    height: ${swatchDimensions};
    border-radius: ${swatchDimensions};
    overflow: hidden;
`;

export const SwatchSmall = styled.View`
    width: ${smallSwatchDimensions};
    height: ${smallSwatchDimensions};
    border-radius: ${smallSwatchDimensions};
    overflow: hidden;
`;
