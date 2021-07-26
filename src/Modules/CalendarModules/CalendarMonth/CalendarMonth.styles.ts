import styled from '@emotion/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
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

export const MonthCalendarContainer = styled.TouchableOpacity`
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

interface MonthProps {
    colour: string;
}

export const MonthText = styled(TextTicker)<MonthProps>`
    color: ${props => props.colour};
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(1.5) + 'px'};
`;

export const MonthContainer = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    padding-left: ${widthPercentageToDP(2) + 'px'};
    margin-bottom: ${heightPercentageToDP(2) + 'px'};
`;

export const MonthCell = styled.View<MonthProps>`
    aspect-ratio: 1;
    width: ${widthPercentageToDP(6) + 'px'};
    height: 1px;
    margin: ${heightPercentageToDP(0.15) + 'px'};
    border-radius: ${heightPercentageToDP(0.5) + 'px'};
    background-color: ${props => props.colour};
`;
