import styled from '@emotion/native';
import { Dimensions } from 'react-native';

const cellDimensions = (Dimensions.get('screen').width - 120) / 53;

interface CalendarCellProps {
    colour: string;
}

export const CalendarCell = styled.View<CalendarCellProps>`
    width: ${cellDimensions + 'px'};
    height: ${cellDimensions + 'px'};
    margin: 0.8px;
    border-radius: 1px;
    background-color: ${props => props.colour};
`;

export const CalendarContainer = styled.View`
    flex-wrap: wrap;
    height: ${cellDimensions * 10 + 'px'};
    margin: 18px;
`;
