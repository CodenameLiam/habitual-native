import styled from '@emotion/native';
import { isTablet } from 'Helpers/Size';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';
import { maxChartHeight } from './TrendChart.functions';

export const TrendContainer = styled.View`
    margin: 15px;
    height: ${heightPercentageToDP(22) + 'px'};
`;

export const TrendLinesContainer = styled.View`
    height: ${maxChartHeight + 'px'};
    padding: 0px 5px;
    flex-direction: row;
    justify-content: space-between;
`;

export const TrendMonthContainer = styled.View`
    height: ${heightPercentageToDP(3) + 'px'};
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
    font-size: ${heightPercentageToDP(1.4) + 'px'};
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
    width: ${widthPercentageToDP(0.6) + 'px'};
`;

interface TrendLineProps {
    height: number;
    colour: string;
    display?: boolean;
    time?: boolean;
}

export const TrendLine = styled.View<TrendLineProps>`
    width: 100%;
    height: ${props => props.height}px;
    background-color: ${props => props.colour};
    border-radius: 10px;
`;

export const TrendDot = styled.View<TrendLineProps>`
    position: absolute;
    display: ${props => (props.display ? 'flex' : 'none')};
    background-color: ${props => props.colour};
    top: ${props => props.height + 'px'};
    height: ${heightPercentageToDP(0.4) + 'px'};
    width: ${widthPercentageToDP(1.2) + 'px'};
    border-radius: 3px;
`;

export const TrendLabelContainer = styled.View<TrendLineProps>`
    position: absolute;
    overflow: hidden;
    top: ${props => props.height - heightPercentageToDP(0.9) + 'px'};
    background-color: ${props => props.colour};
    border-radius: 100px;
    width: ${props => (props.time ? heightPercentageToDP(6.5) : heightPercentageToDP(5)) + 'px'};
    height: ${heightPercentageToDP(2.5) + 'px'};
    justify-content: center;
    align-items: center;
    left: ${props =>
        (props.time
            ? isTablet()
                ? -widthPercentageToDP(10)
                : -heightPercentageToDP(6)
            : isTablet()
            ? -widthPercentageToDP(9)
            : -heightPercentageToDP(5)) + 'px'};
`;

export const TrendLabel = styled.Text`
    color: ${props => props.theme.text};
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(1.5) + 'px'};
`;

/* font-size: ${heightPercentageToDP(1.4) + 'px'}; */
