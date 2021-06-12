import { useTheme } from '@emotion/react';
import Card from 'Components/Card/Card';
import Icon from 'Components/Icon';
import { IHabit, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { getDisabledDays, today } from './CalendarModule';
import {
    StatsBar,
    StatsCard,
    StatsCardLeft,
    StatsContainer,
    StatsContentContainer,
    StatsText,
} from './StatsModule.style';

interface streakResult {
    currentStreak: number;
    dayPointer: string;
}

// Returns the streak for a habit from a given start date
const getStreak = (habit: IHabit, date: string): streakResult => {
    let currentStreak = 0;
    let dayPointerIndex = 0;
    let dayPointer = moment(date)
        .subtract(dayPointerIndex + 1, 'd')
        .format('YYYY-MM-DD');

    let dayIndex = moment(dayPointer).format('ddd').toUpperCase();

    while (
        (habit.dates[dayPointer] && habit.dates[dayPointer].progress >= habit.dates[dayPointer].progressTotal) ||
        habit.schedule[dayIndex as ScheduleType] === false
    ) {
        currentStreak++;
        dayPointerIndex++;
        dayPointer = moment(date)
            .subtract(dayPointerIndex + 1, 'd')
            .format('YYYY-MM-DD');
        dayIndex = moment(dayPointer).format('ddd').toUpperCase();
    }

    if (
        (habit.dates[date] && habit.dates[date].progress >= habit.dates[date].progressTotal) ||
        habit.schedule[dayIndex as ScheduleType] === false
    ) {
        currentStreak++;
    }

    return { currentStreak, dayPointer };
};

// Returns the highest streak for a given habit
const getHighestStreak = (habit: IHabit, sortedDates: string[]): number => {
    let highestStreak = 0;

    if (sortedDates.length > 0) {
        let dayPointer = today;

        do {
            const streak = getStreak(habit, dayPointer);
            dayPointer = streak.dayPointer;

            if (streak.currentStreak > highestStreak) {
                highestStreak = streak.currentStreak;
            }

            do {
                dayPointer = moment(dayPointer).subtract(1, 'd').format('YYYY-MM-DD');
            } while (
                habit.dates[dayPointer] &&
                habit.dates[dayPointer].progress < habit.dates[dayPointer].progressTotal
            );
        } while (new Date(dayPointer).getTime() >= new Date(sortedDates[0]).getTime());
    }

    return highestStreak;
};

// Returns the total number of habits complete
const getTotalComplete = (markedDates: any): number => {
    return Object.keys(markedDates).filter(date => markedDates[date].selected === true).length;
};

// Returns the completion rate for a given habit
const getCompletionRate = (habit: IHabit, sortedDates: string[], markedDates: any): number => {
    const startDate = moment(sortedDates[0]);
    const daysToDisable = getDisabledDays(habit);

    let unselectedDays = 0;
    let completedDays = getTotalComplete(markedDates);
    let totalDays = moment().add(1, 'd').diff(startDate, 'd');

    if (totalDays === 0) {
        totalDays = 1;
    }

    for (let m = startDate.clone(); m.diff(moment()) <= 0; m.add(1, 'days')) {
        if (daysToDisable.includes(m.day())) {
            const markedDate = markedDates[m.format('YYYY-MM-DD')];
            if (markedDate && markedDate.selected) {
                unselectedDays++;
            } else {
                completedDays++;
            }
        }
    }

    totalDays -= unselectedDays;
    completedDays -= unselectedDays;

    const completionRate = (completedDays / totalDays) * 100;

    return Math.round(completionRate * 10) / 10;
};

interface StatsModuleProps {
    habit: IHabit;
    colour: string;
    sortedDates: string[];
    markedDates: any;
}

const StatsModule: React.FC<StatsModuleProps> = ({ habit, colour, sortedDates, markedDates }) => {
    const theme = useTheme();
    const streak = useMemo(() => getStreak(habit, today), [habit]);
    const highestStreak = useMemo(() => getHighestStreak(habit, sortedDates), [habit, sortedDates]);
    const totalComplete = useMemo(() => getTotalComplete(markedDates), [markedDates]);
    const completionRate = useMemo(() => getCompletionRate(habit, sortedDates, markedDates), [
        habit,
        sortedDates,
        markedDates,
    ]);

    return (
        <React.Fragment>
            <StatsContainer>
                <Card style={StatsCardLeft} textStyle={{ fontSize: 17, color: theme.text }} title="Current Streak">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="fire" colour={theme.text} size={30} />
                        <StatsText>{streak.currentStreak}</StatsText>
                    </StatsContentContainer>
                </Card>
                <Card style={StatsCard} textStyle={{ fontSize: 17, color: theme.text }} title="Highest Streak">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="crown" colour={theme.text} size={30} />
                        <StatsText>{highestStreak}</StatsText>
                    </StatsContentContainer>
                </Card>
            </StatsContainer>
            <StatsContainer style={{ marginBottom: 20 }}>
                <Card style={StatsCardLeft} textStyle={{ fontSize: 17, color: theme.text }} title="Total Complete">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="check" colour={theme.text} size={30} />
                        <StatsText>{totalComplete}</StatsText>
                    </StatsContentContainer>
                </Card>
                <Card style={StatsCard} textStyle={{ fontSize: 17, color: theme.text }} title="Completion Rate">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="percentage" colour={theme.text} size={30} />
                        <StatsText>{completionRate}</StatsText>
                    </StatsContentContainer>
                </Card>
            </StatsContainer>
        </React.Fragment>
    );
};

export default StatsModule;
