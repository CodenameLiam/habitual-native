import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TextTicker from 'react-native-text-ticker';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

// ------------------------------------------------------------------------------------
// Cells
// ------------------------------------------------------------------------------------
const weekCellContainer = Dimensions.get('screen').width / 13.5;
const weekTextContainer = Dimensions.get('screen').width - weekCellContainer * 8.5;
/* margin-left: ${weekTextContainer + 'px'}; */

export const WeekDayContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    z-index: 10;
    margin-top: 20px;
    margin-right: ${heightPercentageToDP(1.5) + 'px'};
`;

export const WeekDayText = styled.Text`
    color: ${props => props.theme.text};
    font-family: ${fontFamilyBold};
`;

interface WeekCellProps {
    colour: string;
}
/* height: ${weekCellContainer + 'px'};
width: ${weekCellContainer + 'px'}; */

export const WeekCell = styled.TouchableOpacity<WeekCellProps>`
    aspect-ratio: 1;
    width: 10%;
    background-color: ${props => props.colour};
    margin: ${heightPercentageToDP(0.2) + 'px'};
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
    margin-right: ${heightPercentageToDP(1.5) + 'px'};
`;

/* width: ${weekTextContainer + 'px'};
    height: ${weekCellContainer + 'px'}; */
/* padding-right: 10px; */
/* padding-left: 15px; */

export const WeekHabitButton = styled.TouchableOpacity`
    flex: 1;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: ${heightPercentageToDP(1.5) + 'px'};
`;

export const WeekHabitText = styled(TextTicker)<WeekCellProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
`;
