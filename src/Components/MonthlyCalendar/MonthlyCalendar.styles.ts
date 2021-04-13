import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import TextTicker from 'react-native-text-ticker';

const calendarWidth = Dimensions.get('screen').width / 2 - 22.5;
const calendarHeight = calendarWidth / 1.2;
const cellDimensions = calendarWidth / 8.5;

export const MonthlyCalendarContainer = styled.View`
    width: ${calendarWidth + 'px'};
    height: ${calendarHeight + 'px'};
    flex-wrap: wrap;
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

export const MonthCell = styled.View<MonthProps>`
    width: ${cellDimensions + 'px'};
    height: ${cellDimensions + 'px'};
    margin: 1.5px;
    border-radius: 3px;
    background-color: ${props => props.colour};
`;
