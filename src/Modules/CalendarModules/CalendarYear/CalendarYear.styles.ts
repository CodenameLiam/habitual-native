import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

interface YearTextProps {
    colour: string;
}

export const YearHabitText = styled.Text<YearTextProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-weight: 600;
    font-size: ${heightPercentageToDP(1.5) + 'px'};
`;
