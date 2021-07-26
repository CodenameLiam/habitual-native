import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

export const TrendButtonContainer = styled(TouchableOpacity)`
    margin-bottom: ${heightPercentageToDP(2) + 'px'};
    border-radius: ${heightPercentageToDP(1) + 'px'};
    height: ${heightPercentageToDP(8.5) + 'px'};
    padding: ${heightPercentageToDP(1) + 'px'};
    width: 48%;
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.card};
    flex-direction: row;
    align-items: center;
`;

export const TrendButtonCircle = styled.View`
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: ${heightPercentageToDP(5) + 'px'};
    border-radius: ${heightPercentageToDP(5) + 'px'};
    background-color: ${props => props.theme.background};
`;

export const TrendTextContainer = styled.View`
    margin-left: ${heightPercentageToDP(1) + 'px'};
    width: 60%;
    align-items: flex-start;
`;

interface TrendAverageTextProps {
    colour: string;
}

export const TrendAverageTextContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const TrendAverageText = styled.Text<TrendAverageTextProps>`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    color: ${props => props.colour};
`;

export const TrendAverageWeekText = styled(TrendAverageText)`
    font-size: ${heightPercentageToDP(1.2) + 'px'};
    margin-bottom: 2px;
`;

export const TrendHabitText = styled(TextTicker)`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(1.4) + 'px'};
    color: ${props => props.theme.text};
`;
