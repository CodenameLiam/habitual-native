import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

// ------------------------------------------------------------------------------------
// Containers
// ------------------------------------------------------------------------------------
export const AllMonthContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
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

// ------------------------------------------------------------------------------------
// Habits
// ------------------------------------------------------------------------------------
const calendarWidth = Dimensions.get('screen').width / 2 - 22.5;
const calendarHeight = calendarWidth / 1.2;
const cellDimensions = calendarWidth / 8.5;

interface MonthProps {
    colour: string;
}

export const MonthText = styled(TextTicker)<MonthProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
`;

export const MonthContainer = styled.View`
    width: ${calendarWidth + 'px'};
    height: ${calendarHeight + 'px'};
    flex-wrap: wrap;
    flex-direction: row;
`;

export const MonthCell = styled.View<MonthProps>`
    width: ${cellDimensions + 'px'};
    height: ${cellDimensions + 'px'};
    margin: 1.5px;
    border-radius: 3px;
    background-color: ${props => props.colour};
`;
