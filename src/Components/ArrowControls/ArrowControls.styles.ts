import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';

export const ArrowContainer = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const ArrowTitle = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    padding: 20px 0px;
    text-align: center;
    color: ${props => props.theme.text};
`;

interface ArrowProps {
    colour: string;
    placement: 'left' | 'right';
}

export const ArrowButton = styled(TouchableOpacity)<ArrowProps>`
    background-color: ${props => props.colour + '50'};
    width: 25px;
    height: 25px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-left: ${props => (props.placement === 'left' ? '25px' : 0)};
    margin-right: ${props => (props.placement === 'right' ? '25px' : 0)};
`;
