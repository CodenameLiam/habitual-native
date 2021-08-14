import styled from '@emotion/native';
import { isTablet } from 'Helpers/Size';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

interface CircleButtonProps {
    circleDimensions: number;
}

export const CircleButton = styled(TouchableOpacity)<CircleButtonProps>`
    width: ${props => props.circleDimensions + 'px'};
    max-width: 50px;
    border-radius: ${props => props.circleDimensions + 'px'};
    justify-content: center;
    align-items: center;
`;

interface CircleTextProps {
    active: boolean;
}

export const DayNumber = styled.Text<CircleTextProps>`
    font-size: ${heightPercentageToDP(isTablet() ? 2 : 1.6) + 'px'};
    font-family: ${fontFamily};
    color: ${props => (props.active ? props.theme.text : props.theme.disabled)};
`;

export const DayText = styled.Text<CircleTextProps>`
    font-size: ${heightPercentageToDP(0.9) + 'px'};
    font-family: ${fontFamilyBold};
    color: ${props => (props.active ? props.theme.text : props.theme.disabled)};
`;

interface CircleActiveProps {
    colour: string;
}

const circleActiveDotDims = heightPercentageToDP(0.6) + 'px';

export const CircleActiveDot = styled.View<CircleActiveProps>`
    height: ${circleActiveDotDims};
    width: ${circleActiveDotDims};
    border-radius: ${circleActiveDotDims};
    position: absolute;
    bottom: -10px;
    background-color: ${props => props.colour};
`;
