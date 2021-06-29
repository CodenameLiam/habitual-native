import styled from '@emotion/native';
import { fontFamily } from 'Styles/Fonts';
import { HabitType } from 'Types/Habit.types';

export const TrendContainer = styled.View`
    margin: 15px;
    height: 180px;
`;

export const TrendLinesContainer = styled.View`
    height: 160px;
    padding: 0px 5px;
    flex-direction: row;
    justify-content: space-between;
`;

export const TrendMonthContainer = styled.View`
    height: 20px;
    flex-direction: row;
    justify-content: space-between;
`;

export type TrendMonthType = 'flex-start' | 'center' | 'flex-end';

interface TrendMonthProps {
    alignment: TrendMonthType;
}

export const TrendMonth = styled.View<TrendMonthProps>`
    flex: 1;
    align-items: ${props => props.alignment};
`;

export const TrendMonthText = styled.Text`
    font-family: ${fontFamily};
    font-size: 12px;
    font-weight: 700;
    color: ${props => props.theme.text};
    position: absolute;
    bottom: 0;
`;

interface TrendLineContainerProps {
    background?: boolean;
}

export const TrendLineContainer = styled.View<TrendLineContainerProps>`
    position: relative;
    align-items: center;
    justify-content: flex-end;
    ${props => props.background && `background-color: ${props.theme.card};`}
    height: 100%;
`;

interface TrendLineProps {
    height: number;
    colour: string;
    display?: boolean;
    time?: boolean;
}

export const TrendLine = styled.View<TrendLineProps>`
    width: 3px;
    height: ${props => props.height}px;
    background-color: ${props => props.colour};
    border-radius: 10px;
`;

export const TrendDot = styled.View<TrendLineProps>`
    position: absolute;
    display: ${props => (props.display ? 'flex' : 'none')};
    background-color: ${props => props.colour};
    top: ${props => props.height + 'px'};
    height: 3px;
    width: 5px;
    border-radius: 3px;
`;

export const TrendLabelContainer = styled.View<TrendLineProps>`
    position: absolute;
    overflow: hidden;
    top: ${props => props.height + 'px'};
    background-color: ${props => props.colour};
    border-radius: 100px;
    width: ${props => (props.time ? 55 : 40) + 'px'};
    height: 18px;
    justify-content: center;
    align-items: center;
    left: ${props => (props.time ? -50 : -45) + 'px'};
`;

export const TrendLabel = styled.Text`
    color: ${props => props.theme.text};
    font-family: ${fontFamily};
    font-weight: 600;
`;
