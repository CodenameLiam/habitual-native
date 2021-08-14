import { useTheme } from '@emotion/react';
import { IWeeklyTotalArray } from 'Components/TrendButton/TrendButton.functions';
import moment from 'moment';
import React, { useMemo } from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { getChartString } from 'Screens/Stats/StatsScreen.functions';
import { HabitType } from 'Types/Habit.types';
import { getAlignment, getHeight, maxChartHeight } from './TrendChart.functions';
import {
    TrendLine,
    TrendMonthText,
    TrendContainer,
    TrendMonth,
    TrendLinesContainer,
    TrendMonthContainer,
    TrendLineContainer,
    TrendDot,
    TrendLabel,
    TrendLabelContainer,
} from './TrendChart.styles';

// Array of the past years weeks
export const weekArray = Array.from(Array(52))
    .map((value, index) => moment().subtract(index, 'week').startOf('isoWeek'))
    .reverse();

const monthArray = Array.from(Array(12))
    .map((value, index) => moment().subtract(index, 'month').startOf('month'))
    .reverse();

interface TrendChartProps {
    colour: string;
    type: HabitType;
    weeklyTotalArray: IWeeklyTotalArray;
    threeMonthAverage: number;
    yearAverage: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ colour, type, weeklyTotalArray, threeMonthAverage, yearAverage }) => {
    const theme = useTheme();
    const { enoughData, heights, maxHeight } = weeklyTotalArray;

    const threeMonthAverageHeight = useMemo(() => maxChartHeight - getHeight(maxHeight, threeMonthAverage), [
        maxHeight,
        threeMonthAverage,
    ]);
    const yearAverageHeight = useMemo(() => maxChartHeight - getHeight(maxHeight, yearAverage), [
        maxHeight,
        yearAverage,
    ]);

    return (
        <TrendContainer>
            <TrendLinesContainer>
                {weekArray.map((day, index) => {
                    return (
                        <TrendLineContainer key={index} background={index === 0 || index === 40 || index === 51}>
                            <TrendLine
                                height={getHeight(maxHeight, heights[index])}
                                colour={index > 40 ? colour : theme.grey}
                            />
                            <TrendDot
                                display={(enoughData && index <= 40) || index > 40}
                                colour={index > 40 ? colour : theme.grey}
                                height={index > 40 ? threeMonthAverageHeight : yearAverageHeight}
                            />
                            {enoughData && index === 25 && (
                                <TrendLabelContainer
                                    colour={theme.grey}
                                    height={yearAverageHeight}
                                    time={type === 'time'}
                                >
                                    <TrendLabel>{getChartString(yearAverage, type).split(' ')[0]}</TrendLabel>
                                </TrendLabelContainer>
                            )}
                            {index === 50 && (
                                <TrendLabelContainer
                                    colour={colour}
                                    height={threeMonthAverageHeight}
                                    time={type === 'time'}
                                >
                                    <TrendLabel>{getChartString(threeMonthAverage, type).split(' ')[0]}</TrendLabel>
                                </TrendLabelContainer>
                            )}
                        </TrendLineContainer>
                    );
                })}
            </TrendLinesContainer>

            <TrendMonthContainer>
                {monthArray.map(month => (
                    <TrendMonth key={month.format('YYYY-DD-MM')} alignment={getAlignment()}>
                        <TrendMonthText>{month.format('MMM')[0]}</TrendMonthText>
                    </TrendMonth>
                ))}
            </TrendMonthContainer>
        </TrendContainer>
    );
};

export default TrendChart;
