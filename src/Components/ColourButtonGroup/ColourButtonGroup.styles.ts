import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const ColourButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

interface ButtonContainerProps {
    width: number;
    backgroundColour: string;
}

export const ButtonContainer = styled.View<ButtonContainerProps>`
    background-color: ${props => props.backgroundColour + '30'};
    width: ${props => props.width + '%'};
    border-radius: 5px;
`;

export const TextContainer = styled(TouchableOpacity)`
    padding: ${heightPercentageToDP(1) + 'px'};
`;

interface TextContentProps {
    colour: string;
}

export const TextContent = styled.Text<TextContentProps>`
    font-size: ${heightPercentageToDP(1.5) + 'px'};
    text-align: center;
    font-family: ${fontFamily};
    color: ${props => props.colour};
`;
