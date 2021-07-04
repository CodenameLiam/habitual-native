import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const swatchDimensions = Dimensions.get('screen').width / 8 + 'px';

export const PickerContainer = styled.View`
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 2px;
    padding-top: 5px;
`;

interface SwatchProps {
    size?: string;
}

export const Swatch = styled(TouchableOpacity)<SwatchProps>`
    width: ${props => props.size ?? swatchDimensions};
    height: ${props => props.size ?? swatchDimensions};
    border-radius: ${props => props.size ?? swatchDimensions};
    overflow: hidden;
`;
