import styled from '@emotion/native';
import TextTicker from 'react-native-text-ticker';

export const AllMonthContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
`;

export const MonthCalendarContainer = styled.View`
    width: 50%;
    align-items: center;
`;

export const MonthTextContainer = styled.View`
    margin: 5px;
    width: 80%;
    justify-content: center;
    flex-direction: row;
`;

interface MonthProps {
    colour: string;
}

export const MonthText = styled(TextTicker)<MonthProps>`
    color: ${props => props.colour};
    font-family: 'Montserrat';
    font-weight: 600;
`;
