import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

interface InputProps {
    colour: string;
}

export const StyledBuildInput = styled.TextInput<InputProps>`
    flex: 1;
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
`;
