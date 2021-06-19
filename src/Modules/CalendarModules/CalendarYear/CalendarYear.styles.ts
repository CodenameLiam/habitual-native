import styled from '@emotion/native';
import { fontFamily } from 'Styles/Fonts';

interface YearTextProps {
    colour: string;
}

export const YearHabitText = styled.Text<YearTextProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-weight: 600;
`;
