import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import TextTicker from 'react-native-text-ticker';

export const TrendButtonContainer = styled(TouchableOpacity)`
    margin-bottom: 15px;
    border-radius: 5px;
    height: 70px;
    width: 48%;
    padding: 10px;
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.card};
    flex-direction: row;
    align-items: center;
`;

export const TrendButtonCircle = styled.View`
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
    border-radius: 60px;
    background-color: ${props => props.theme.background};
`;

export const TrendTextContainer = styled.View`
    margin-left: 10px;
    width: 60%;
`;

interface TrendAverageTextProps {
    colour: string;
}

export const TrendAverageTextContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const TrendAverageText = styled.Text<TrendAverageTextProps>`
    font-weight: 700;
    font-size: 20px;
    color: ${props => props.colour};
`;

export const TrendAverageWeekText = styled(TrendAverageText)`
    font-size: 12px;
    margin-bottom: 2px;
`;

export const TrendHabitText = styled(TextTicker)`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 12px;
    color: ${props => props.theme.text};
`;
