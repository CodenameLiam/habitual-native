import styled, { css } from '@emotion/native';
import { Animated, TouchableOpacity } from 'react-native';

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
`;

export const HabitIconContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 15px;
    width: 35px;
    height: 30px;
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
