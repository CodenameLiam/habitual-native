import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export const PickerContainer = styled.View`
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 5px;
`;

interface SwatchProps {
    size?: string;
}

export const Swatch = styled(TouchableOpacity)<SwatchProps>`
    width: ${props => props.size ?? widthPercentageToDP(13.5) + 'px'};
    border-radius: ${widthPercentageToDP(13.5) + 'px'};
    overflow: hidden;
`;
