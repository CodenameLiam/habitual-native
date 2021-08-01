import styled from '@emotion/native';
import { TextInput } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

interface InputProps {
    colour: string;
}

export const BuildInput = styled(TextInput)<InputProps>`
    flex: 1;
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-size: 18px;
`;

// export const BuildModalInputContainer = styled.View``

export const BuildModalInput = styled.TextInput<InputProps>`
    flex: 1;
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    font-family: ${fontFamily};
    color: ${props => props.colour};
    background-color: ${props => props.theme.background};
    font-size: ${heightPercentageToDP(2) + 'px'};
`;
