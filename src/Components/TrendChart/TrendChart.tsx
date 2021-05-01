import { useTheme } from '@emotion/react';
import { IHabit } from 'Controllers/HabitController/HabitController';
import moment, { Moment } from 'moment';
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import {
    TrendLine,
    TrendMonthText,
    TrendContainer,
    TrendMonth,
    TrendLinesContainer,
    TrendMonthContainer,
    TrendMonthType,
    TrendLineContainer,
} from './TrendChart.styles';

const weekArray = Array.from(Array(52)).map((value, index) => moment().subtract(index, 'week').startOf('isoWeek'));

const monthArray = Array.from(Array(12))
    .map((value, index) => moment().subtract(index, 'month').startOf('month'))
    .reverse();

interface TrendChartProps {
    habit: IHabit;
    colour: string;
}

// Gets the total number of times the habit was completed for the week
const getWeeklyTotal = (habit: IHabit, weekStart: Moment): number => {
    let height = 0;
    for (let i = 0; i < 7; i++) {
        const day = weekStart.clone().add(i, 'day');
        const dayString = day.format('YYYY-MM-DD');
        if (habit.dates[dayString]) {
            height = height + habit.dates[dayString].progress;
        }
    }
    return height;
};

interface IHeightArray {
    heights: number[];
    maxHeight: number;
}

// Gets an array of weekly totals for the year
const getWeeklyTotalArray = (habit: IHabit): IHeightArray => {
    const heights = weekArray.map((week, index) => getWeeklyTotal(habit, week)).reverse();
    const maxHeight = Math.max(...heights);
    return { heights, maxHeight };
};

const getHeight = (maxHeight: number, height: number): number => {
    return height === 0 || maxHeight === 0 ? 0 : (height / maxHeight) * 150;
};

const getAlignment = (): TrendMonthType => {
    const diff = moment().diff(moment().startOf('month'), 'days');
    if (diff > 12) {
        return 'center';
    } else if (diff > 24) {
        return 'flex-start';
    } else return 'flex-end';
};

const getThreeMonthAverage = (weeklyTotalArray: number[]): number => {
    const threeMonthAverage = weeklyTotalArray.slice(40, 52);
    return threeMonthAverage.length > 0 ? threeMonthAverage.reduce((a, b) => a + b) / threeMonthAverage.length : 0;
};

const getYearAverage = (weeklyTotalArray: number[]): number => {
    return weeklyTotalArray.length > 0 ? weeklyTotalArray.reduce((a, b) => a + b) / weeklyTotalArray.length : 0;
};

const lineEnd = Dimensions.get('screen').width - 15;
const lineMid = (lineEnd / 4) * 3;

const TrendChart: React.FC<TrendChartProps> = ({ habit, colour }) => {
    const theme = useTheme();
    const weeklyTotalArray = getWeeklyTotalArray(habit);
    const threeMonthAverage = getThreeMonthAverage(weeklyTotalArray.heights);
    const yearAverage = getYearAverage(weeklyTotalArray.heights);

    const { heights, maxHeight } = weeklyTotalArray;

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
            <Svg style={{ position: 'absolute', zIndex: 3 }}>
                <Line
                    stroke={theme.grey}
                    strokeWidth={3}
                    strokeDasharray={4}
                    x1={0}
                    x2={lineEnd}
                    y={160 - getHeight(maxHeight, yearAverage)}
                />
            </Svg>
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
