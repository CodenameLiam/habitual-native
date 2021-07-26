import styled, { css } from '@emotion/native';
import { TrendButtonCircle } from 'Components/TrendButton/TrendButton.styles';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const TrendGrowthContainer = styled.View`
    padding: 15px;
    padding: ${heightPercentageToDP(2) + 'px'};
    flex-direction: row;
    align-items: center;
`;

export const TrendMessageContainer = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const TrendMessage = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(1.4) + 'px'};
    color: ${props => props.theme.text};
    margin-top: ${heightPercentageToDP(0.5) + 'px'};
`;

export const TrendButtonCircleLarge = styled(TrendButtonCircle)`
    aspect-ratio: 1;
    height: ${heightPercentageToDP(7) + 'px'};
    background-color: ${props => props.theme.card};
    margin-right: ${heightPercentageToDP(1) + 'px'};
`;

export const TrendMessageMargin = css`
    margin-left: ${heightPercentageToDP(2.5) + 'px'};
`;

interface TrendStatsProps {
    colour?: string;
}

export const TrendStats = styled.Text<TrendStatsProps>`
    margin-left: ${heightPercentageToDP(2.5) + 'px'};
    margin-bottom: ${props => (!props.colour ? 0 : 5) + 'px'};
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    color: ${props => props.colour ?? props.theme.grey};
`;
