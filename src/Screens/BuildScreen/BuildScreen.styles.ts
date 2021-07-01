import styled from '@emotion/native';
import { TextInput } from 'react-native';
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
