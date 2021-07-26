import { useTheme } from '@emotion/react';
import Card from 'Components/Card/Card';
import Icon from 'Components/Icon';
import { getCompleted, getCompletedRate, getHighestStreak, getSortedDates, getStreak } from 'Helpers/Habits';
import moment from 'moment';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { HabitObject } from 'Types/Habit.types';
import { useDebouncedCallback } from 'use-debounce/lib';
import {
    AllStatsContainer,
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
    const completed = useMemo(() => getCompleted(statHabit), [statHabit]);
    const streak = useMemo(() => getStreak(statHabit, moment()).streak, [statHabit]);
    const highestStreak = useMemo(
        () => (sortedDates.length > 0 ? getHighestStreak(statHabit, moment(sortedDates[0])) : 0),
        [sortedDates, statHabit],
    );
    const completeRate = useMemo(
        () => (completed > 0 ? getCompletedRate(statHabit, moment(sortedDates[0]), completed) : 0),
        [sortedDates, statHabit, completed],
    );

    // Debounce calendar update function
    const updateStatHabit = useDebouncedCallback((habit: HabitObject) => setStatHabit(habit), 500);

    // Update calendar if props change
    useEffect(() => {
        updateStatHabit(habit);
    }, [habit, updateStatHabit]);

    return (
        <AllStatsContainer>
            <StatsContainer>
                <Card
                    style={StatsCardLeft}
                    textStyle={{ fontSize: heightPercentageToDP(1.8), color: theme.text, textAlign: 'center' }}
                    title="Current Streak"
                >
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="fire" colour={theme.text} size={heightPercentageToDP(3.5)} />
                        <StatsText>{streak}</StatsText>
                    </StatsContentContainer>
                </Card>
                <Card
                    style={StatsCard}
                    textStyle={{ fontSize: heightPercentageToDP(1.8), color: theme.text, textAlign: 'center' }}
                    title="Highest Streak"
                >
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="crown" colour={theme.text} size={heightPercentageToDP(3.5)} />
                        <StatsText>{highestStreak}</StatsText>
                    </StatsContentContainer>
                </Card>
            </StatsContainer>
            <StatsContainer>
                <Card
                    style={StatsCardLeft}
                    textStyle={{ fontSize: heightPercentageToDP(1.8), color: theme.text, textAlign: 'center' }}
                    title="Total Completed"
                >
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon family="fontawesome5" name="check" colour={theme.text} size={heightPercentageToDP(3.5)} />
                        <StatsText>{completed}</StatsText>
                    </StatsContentContainer>
                </Card>
                <Card
                    style={StatsCard}
                    textStyle={{ fontSize: heightPercentageToDP(1.8), color: theme.text, textAlign: 'center' }}
                    title="Completion Rate"
                >
                    <StatsBar colour={colour} />
                    <StatsContentContainer>
                        <Icon
                            family="fontawesome5"
                            name="percentage"
                            colour={theme.text}
                            size={heightPercentageToDP(3.5)}
                        />
                        <StatsText>{completeRate}</StatsText>
                    </StatsContentContainer>
                </Card>
            </StatsContainer>
        </AllStatsContainer>
    );
};

export default ViewStats;
