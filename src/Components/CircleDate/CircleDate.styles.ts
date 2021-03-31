import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CircleButtonProps {
    circleDimensions: number;
}

export const CircleButton = styled(TouchableOpacity)<CircleButtonProps>`
    width: ${props => props.circleDimensions + 'px'};
    height: ${props => props.circleDimensions + 'px'};
    border-radius: ${props => props.circleDimensions + 'px'};
    justify-content: center;
    align-items: center;
`;

interface CircleTextProps {
    selected: boolean;
}

export const DayNumber = styled.Text<CircleTextProps>`
    font-family: 'Montserrat';
    font-weight: 600;
    color: ${props => (props.selected ? props.theme.text : props.theme.disabled)};
`;

export const DayText = styled.Text<CircleTextProps>`
    font-size: 8px;
    font-weight: 700;
    font-family: 'Montserrat';
    color: ${props => (props.selected ? props.theme.text : props.theme.disabled)};
`;
