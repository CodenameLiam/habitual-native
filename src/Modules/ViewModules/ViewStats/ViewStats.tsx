import { useTheme } from '@emotion/react';
import Card from 'Components/Card/Card';
import Icon from 'Components/Icon';
import { getHighestStreak, getSortedDates, getStreak } from 'Helpers/Habits';
import moment from 'moment';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { HabitObject } from 'Types/Habit.types';
import { useDebouncedCallback } from 'use-debounce/lib';
import {
    StatsBar,
    StatsCard,
    StatsCardLeft,
    StatsContainer,
    StatsContentContainer,
    StatsText,
} from './ViewStats.styles';

interface ViewStatsProps {
    colour: string;
    habit: HabitObject;
}

const ViewStats: FC<ViewStatsProps> = ({ colour, habit }) => {
    const theme = useTheme();
    const [statHabit, setStatHabit] = useState(habit);
    const sortedDates = useMemo(() => getSortedDates(statHabit.dates), [statHabit.dates]);
    const streak = useMemo(() => getStreak(statHabit, moment()).streak, [statHabit]);
    const highestStreak = useMemo(() => (sortedDates.length > 0 ? getHighestStreak(statHabit, sortedDates) : 0), [
        sortedDates,
        statHabit,
    ]);

    // Debounce calendar update function
    const updateStatHabit = useDebouncedCallback((habit: HabitObject) => setStatHabit(habit), 500);

    // Update calendar if props change
    useEffect(() => {
        updateStatHabit(habit);
    }, [habit, updateStatHabit]);

    return (
        <Fragment>
            <StatsContainer>
                <Card style={StatsCardLeft} textStyle={{ fontSize: 17, color: theme.text }} title="Current Streak">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="fire" colour={theme.text} size={30} />
                        <StatsText>{streak}</StatsText>
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
            <StatsContainer>
                <Card style={StatsCardLeft} textStyle={{ fontSize: 17, color: theme.text }} title="Total Completed">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="check" colour={theme.text} size={30} />
                        <StatsText>{12}</StatsText>
                    </StatsContentContainer>
                </Card>
                <Card style={StatsCard} textStyle={{ fontSize: 17, color: theme.text }} title="Completion Rate">
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="percentage" colour={theme.text} size={30} />
                        <StatsText>{12}</StatsText>
                    </StatsContentContainer>
                </Card>
            </StatsContainer>
        </Fragment>
    );
};

export default ViewStats;
