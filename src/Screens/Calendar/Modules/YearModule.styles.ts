import styled from '@emotion/native';

interface YearTextProps {
    colour: string;
}

export const YearHabitText = styled.Text<YearTextProps>`
    color: ${props => props.colour};
    font-family: 'Montserrat';
    font-weight: 600;
`;
