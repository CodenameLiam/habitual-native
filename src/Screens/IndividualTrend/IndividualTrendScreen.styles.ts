import styled, { css } from '@emotion/native';
import { TrendButtonCircle } from 'Components/TrendButton/TrendButton.styles';

export const TrendGrowthContainer = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const TrendMessageContainer = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const TrendMessage = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 12px;
    color: ${props => props.theme.text};
`;

export const TrendButtonCircleLarge = styled(TrendButtonCircle)`
    height: 60px;
    width: 60px;
    background-color: ${props => props.theme.card};
`;

export const TrendMessageMargin = css`
    margin-left: 15px;
    margin-top: 10px;
`;

interface TrendStatsProps {
    colour?: string;
}

export const TrendStats = styled.Text<TrendStatsProps>`
    margin-left: 15px;
    margin-bottom: ${props => (!props.colour ? 0 : 5) + 'px'};
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    color: ${props => props.colour ?? props.theme.grey};
`;
