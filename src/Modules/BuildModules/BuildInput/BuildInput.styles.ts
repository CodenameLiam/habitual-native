import styled from '@emotion/native';
import { TextInput } from 'react-native';

interface InputProps {
    colour: string;
}

export const StyledBuildInput = styled(TextInput)<InputProps>`
    flex: 1;
    color: ${props => props.colour};
    font-family: 'Montserrat-SemiBold';
    font-size: 18px;
`;
