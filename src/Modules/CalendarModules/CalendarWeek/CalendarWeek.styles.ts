import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

// ------------------------------------------------------------------------------------
// Cells
// ------------------------------------------------------------------------------------
const weekCellContainer = Dimensions.get('screen').width / 13.5;
const weekTextContainer = Dimensions.get('screen').width - weekCellContainer * 8.5;

export const WeekDayContainer = styled.View`
    flex-direction: row;
    margin-left: ${weekTextContainer + 'px'};
`;

export const WeekDayText = styled.Text`
    color: ${props => props.theme.text};
    font-family: ${fontFamily};
    font-weight: 800;
`;

interface WeekCellProps {
    colour: string;
}

export const WeekCell = styled.TouchableOpacity<WeekCellProps>`
    background-color: ${props => props.colour};
    height: ${weekCellContainer + 'px'};
    width: ${weekCellContainer + 'px'};
    margin: 2px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

// ------------------------------------------------------------------------------------
// Habits
// ------------------------------------------------------------------------------------
export const WeekHabitContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const WeekHabitButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: ${weekTextContainer + 'px'};
    height: ${weekCellContainer + 'px'};
    padding-right: 10px;
    padding-left: 15px;
`;

export const WeekHabitText = styled(TextTicker)<WeekCellProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-weight: 600;
`;
