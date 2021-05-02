import styled from '@emotion/native';

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
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.text};
    position: absolute;
    bottom: 0;
`;

interface TrendLineContainerProps {
    background?: boolean;
}

export const TrendLineContainer = styled.View<TrendLineContainerProps>`
    justify-content: flex-end;
    ${props => props.background && `background-color: ${props.theme.card};`}
    height: 100%;
`;

interface TrendLineProps {
    height: number;
    colour: string;
}

export const TrendLine = styled.View<TrendLineProps>`
    width: 3px;
    height: ${props => props.height}px;
    background-color: ${props => props.colour};
    border-radius: 10px;
`;
