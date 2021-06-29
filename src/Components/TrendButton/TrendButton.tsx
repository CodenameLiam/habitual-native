import Icon from 'Components/Icon';
import React, { FC, useCallback, useMemo, memo } from 'react';
import { Gradients } from 'Styles/Colours';
import { getThreeMonthAverage, getWeeklyTotalArray, getYearAverage } from './TrendButton.functions';
import {
    TrendAverageText,
    TrendAverageTextContainer,
    TrendAverageWeekText,
    TrendButtonCircle,
    TrendButtonContainer,
    TrendHabitText,
    TrendTextContainer,
} from './TrendButton.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { HabitObject } from 'Types/Habit.types';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { getSortedDates } from 'Helpers/Habits';
import { getChartString } from 'Screens/Stats/StatsScreen.functions';

interface TrendButtonProps {
    habit: HabitObject;
    navigation: TabNavProps;
}

const TrendButton: FC<TrendButtonProps> = ({ habit, navigation }) => {
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);
    const sortedDates = useMemo(() => getSortedDates(habit.dates), [habit.dates]);

    const weeklyTotalArray = useMemo(() => getWeeklyTotalArray(habit, sortedDates), [habit, sortedDates]);
    const threeMonthAverage = useMemo(() => getThreeMonthAverage(weeklyTotalArray.heights), [weeklyTotalArray.heights]);
    const yearAverage = useMemo(() => getYearAverage(weeklyTotalArray.heights, sortedDates), [
        sortedDates,
        weeklyTotalArray.heights,
    ]);

    const handlePress = useCallback((): void => {
        ReactNativeHapticFeedback.trigger('impactLight');
        navigation.navigate('Stats', {
            id: habit.id,
            name: habit.name,
            colour: habit.colour,
            weeklyTotalArray,
            threeMonthAverage,
            yearAverage,
        });
    }, [habit.colour, habit.id, habit.name, navigation, threeMonthAverage, weeklyTotalArray, yearAverage]);

    return (
        <TrendButtonContainer onPress={handlePress}>
            <TrendButtonCircle>
                <Icon
                    family="entypo"
                    name={
                        weeklyTotalArray.enoughData
                            ? threeMonthAverage > yearAverage
                                ? 'chevron-up'
                                : 'chevron-down'
                            : 'minus'
                    }
                    size={42}
                    colour={gradient.solid}
                />
            </TrendButtonCircle>
            <TrendTextContainer>
                <TrendHabitText
                    scroll={false}
                    animationType="bounce"
                    duration={3000}
                    bounceDelay={1500}
                    marqueeDelay={1000}
                    bouncePadding={{ left: 0, right: 0 }}
                >
                    {habit.name}
                </TrendHabitText>
                <TrendAverageTextContainer>
                    <TrendAverageText colour={gradient.solid}>
                        {weeklyTotalArray.enoughData
                            ? getChartString(threeMonthAverage, habit.type).split(' ')[0]
                            : '-'}
                    </TrendAverageText>
                    <TrendAverageWeekText colour={gradient.solid}>/week</TrendAverageWeekText>
                </TrendAverageTextContainer>
            </TrendTextContainer>
        </TrendButtonContainer>
    );
};

const MemoizedTrendButton = memo(TrendButton);

export default MemoizedTrendButton;
