import Icon from 'Components/Icon';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { TabNavProps } from 'Navigation/Params';
import React from 'react';

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

interface TrendButtonProps {
    habit: IHabit;
    navigation: TabNavProps;
}

const TrendButton: React.FC<TrendButtonProps> = ({ habit, navigation }) => {
    const gradient = Gradients[habit.colour];

    const weeklyTotalArray = getWeeklyTotalArray(habit);
    const threeMonthAverage = getThreeMonthAverage(weeklyTotalArray.heights);
    const yearAverage = getYearAverage(habit, weeklyTotalArray.heights);

    const handlePress = (): void => {
        ReactNativeHapticFeedback.trigger('impactLight');
        navigation.navigate('IndividualTrend', {
            id: habit.id,
            name: habit.name,
            colour: habit.colour,
            weeklyTotalArray,
            threeMonthAverage,
            yearAverage,
        });
    };

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
                        {weeklyTotalArray.enoughData ? Math.round(threeMonthAverage * 100) / 100 : '-'}
                    </TrendAverageText>
                    <TrendAverageWeekText colour={gradient.solid}>/week</TrendAverageWeekText>
                </TrendAverageTextContainer>
            </TrendTextContainer>
        </TrendButtonContainer>
    );
};

export default TrendButton;
