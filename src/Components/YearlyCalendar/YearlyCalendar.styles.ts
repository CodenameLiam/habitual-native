import styled from '@emotion/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface CalendarCellProps {
    colour: string;
}

export const CalendarCell = styled.View<CalendarCellProps>`
    aspect-ratio: 1;
    width: ${widthPercentageToDP(1.45) + 'px'};
    margin: ${widthPercentageToDP(0.15) + 'px'};
    border-radius: 1px;
    background-color: ${props => props.colour};
`;

export const CalendarContainer = styled.View`
    align-self: center;
    flex-wrap: wrap;
    padding: ${widthPercentageToDP(2) + 'px'};
    height: ${widthPercentageToDP(17) + 'px'};
`;
