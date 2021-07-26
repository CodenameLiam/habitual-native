import styled from '@emotion/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import TextTicker from 'react-native-text-ticker';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

// ------------------------------------------------------------------------------------
// Cells
// ------------------------------------------------------------------------------------

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
    font-size: ${heightPercentageToDP(1.5) + 'px'};
`;

interface WeekCellProps {
    colour: string;
}

export const WeekCell = styled.TouchableOpacity<WeekCellProps>`
    aspect-ratio: 1;
    width: ${widthPercentageToDP(7) + 'px'};
    background-color: ${props => props.colour};
    margin: ${heightPercentageToDP(0.2) + 'px'};
    border-radius: ${heightPercentageToDP(0.5) + 'px'};
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
    font-size: ${heightPercentageToDP(1.5) + 'px'};
`;
