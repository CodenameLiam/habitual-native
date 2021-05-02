import { useTheme } from '@emotion/react';
import { IWeeklyTotalArray } from 'Components/TrendButton/TrendButton.functions';
import { IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { getAlignment, getHeight } from './TrendChart.functions';
import {
    TrendLine,
    TrendMonthText,
    TrendContainer,
    TrendMonth,
    TrendLinesContainer,
    TrendMonthContainer,
    TrendLineContainer,
} from './TrendChart.styles';

// Array of the past years weeks
export const weekArray = Array.from(Array(52))
    .map((value, index) => moment().subtract(index, 'week').startOf('isoWeek'))
    .reverse();

const monthArray = Array.from(Array(12))
    .map((value, index) => moment().subtract(index, 'month').startOf('month'))
    .reverse();

const lineEnd = Dimensions.get('screen').width - 35;
const lineMid = (lineEnd / 4) * 3 + 15;

interface TrendChartProps {
    colour: string;
    weeklyTotalArray: IWeeklyTotalArray;
    threeMonthAverage: number;
    yearAverage: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ colour, weeklyTotalArray, threeMonthAverage, yearAverage }) => {
    const theme = useTheme();
    const { enoughData, heights, maxHeight } = weeklyTotalArray;

    return (
        <TrendContainer>
            <Svg style={{ position: 'absolute', zIndex: 4 }}>
                <Line
                    stroke={colour}
                    strokeWidth={3}
                    strokeDasharray={4}
                    x1={lineMid}
                    x2={lineEnd}
                    y={160 - getHeight(maxHeight, threeMonthAverage)}
                />
            </Svg>
            {enoughData && (
                <Svg style={{ position: 'absolute', zIndex: 3 }}>
                    <Line
                        stroke={theme.grey}
                        strokeWidth={3}
                        strokeDasharray={4}
                        x1={5}
                        x2={lineEnd}
                        y={160 - getHeight(maxHeight, yearAverage)}
                    />
                </Svg>
            )}

            <TrendLinesContainer>
                {weekArray.map((day, index) => {
                    return (
                        <TrendLineContainer key={index} background={index === 0 || index === 40 || index === 51}>
                            <TrendLine
                                height={getHeight(maxHeight, heights[index])}
                                colour={index > 40 ? colour : theme.grey}
                            />
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
