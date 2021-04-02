import styled, { css } from '@emotion/native';
import { Animated, TouchableOpacity } from 'react-native';
import TextTicker from 'react-native-text-ticker';

export const HabitContainer = styled(Animated.View)`
    background-color: ${props => props.theme.card};
    height: 70px;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
`;

export const HabitContentContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 5px;
    flex: 1;
`;

export const HabitIconContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 15px;
    width: 35px;
    height: 30px;
`;

interface HabitColourContainerProps {
    colour: string;
}
export const HabitColourContainer = styled(Animated.View)<HabitColourContainerProps>`
    background-color: ${props => props.colour};
    height: 35px;
    width: 35px;
    overflow: hidden;
    border-radius: 1000px;
`;

export const HabitTextContainer = styled.View`
    flex: 1;
`;

export const HabitText = styled(TextTicker)`
    font-family: 'Montserrat';
    font-weight: 600;
    color: ${props => props.theme.text};
`;

export const RightAction = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 5px;
    border-radius: 10px;
    background-color: ${props => props.theme.card};
`;

export const HabitScroll = css`
    height: 100%;
    padding: 10px;
`;

export const HabitIcon = css`
    position: absolute;
    z-index: 1;
`;

export const HabitProgressButton = css`
    padding: 26px;
`;

export const HabitProgressText = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    color: ${props => props.theme.text};
`;
