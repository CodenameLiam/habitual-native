import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';

export const ProgressButtonContainer = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: center;
`;

interface ProgressButtonProps {
    colour: string;
}

export const ProgressButton = styled(TouchableOpacity)<ProgressButtonProps>`
    margin: 5px;
    background-color: ${props => props.colour + 50};
    height: 50px;
    width: 50px;
    border-radius: 5px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;
