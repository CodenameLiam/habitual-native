import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const ArrowContainer = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const ArrowTitle = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    padding: 25px 0px;
    text-align: center;
    color: ${props => props.theme.text};
`;

interface ArrowProps {
    colour: string;
    placement: 'left' | 'right';
}

export const ArrowButton = styled(TouchableOpacity)<ArrowProps>`
    aspect-ratio: 1;
    background-color: ${props => props.colour + '30'};
    height: ${heightPercentageToDP(3) + 'px'};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-left: ${props => (props.placement === 'left' ? '30px' : 0)};
    margin-right: ${props => (props.placement === 'right' ? '30px' : 0)};
`;
