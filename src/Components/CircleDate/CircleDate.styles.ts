import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

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
    active: boolean;
}

export const DayNumber = styled.Text<CircleTextProps>`
    font-family: ${fontFamily};
    color: ${props => (props.active ? props.theme.text : props.theme.grey)};
`;

export const DayText = styled.Text<CircleTextProps>`
    font-size: 8px;
    font-family: ${fontFamilyBold};
    color: ${props => (props.active ? props.theme.text : props.theme.grey)};
`;

interface CircleActiveProps {
    colour: string;
}

export const CircleActiveDot = styled.View<CircleActiveProps>`
    height: 5px;
    width: 5px;
    border-radius: 5px;
    position: absolute;
    bottom: -10px;
    background-color: ${props => props.colour};
`;
