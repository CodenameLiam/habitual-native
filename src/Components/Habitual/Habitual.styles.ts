import styled, { css } from '@emotion/native';
import { TouchableOpacity } from 'react-native';

export const HabitualContainer = styled.View`
    background-color: ${props => props.theme.card};
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px;
`;

export const HabitualText = styled.Text`
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 40px;
    color: ${props => props.theme.text};
`;

interface HabitualProgressContainerProps {
    colour: string;
}
export const HabitualProgressContainer = styled.View<HabitualProgressContainerProps>`
    position: absolute;
    top: 10px;
    left: 10px;
    height: 35px;
    width: 35px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colour};
    border-radius: 35px;
`;

export const HabitualProgress = styled.Text`
    position: absolute;
    z-index: 1;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 14px;
    color: ${props => props.theme.text};
`;

export const HabitualInfoContainer = styled(TouchableOpacity)`
    position: absolute;
    top: 0px;
    right: 0px;
`;

export const HabitualInfo = css`
    padding: 15px;
`;
