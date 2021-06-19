import { useColour, useHabits } from 'Context/AppContext';
import React, { useState, FC, useCallback } from 'react';
import { LayoutAnimation, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { weekArray } from 'Helpers/Dates';
import { emptyHabits, getHomeScreenData, getHomeTitle } from './HomeScreen.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { Full, Padding } from 'Styles/Globals';
import { CircleDatesContainer } from './HomeScreen.styles';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedHabit from 'Components/Habit/Habit';
import EmptyPrompt from 'Components/EmptyPrompt/EmptyPrompt';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import MemoizedCircleDate from 'Components/CircleDate/CircleDate';

interface HomeScreenProps {
    navigation: TabNavProps;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const [habits, dispatchHabits] = useHabits();
    const [colour] = useColour();

    const [dateIndex, setDateIndex] = useState(6);
    const { todaysHabits, alphaWeekArray } = getHomeScreenData(habits, dateIndex);

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({ headerTitle: getHomeTitle(dateIndex) });
        }, [navigation, dateIndex]),
    );

    const handlePress = useCallback((index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDateIndex(index);
        ReactNativeHapticFeedback.trigger('impactLight');
    }, []);

    return (
        <View style={Full}>
            <CircleDatesContainer>
                {weekArray.map((date, index) => (
                    <MemoizedCircleDate
                        key={date.format('l')}
                        date={date}
                        colour={colour}
                        active={dateIndex === index}
                        alpha={alphaWeekArray[index]}
                        handlePress={() => handlePress(index)}
                    />
                ))}
            </CircleDatesContainer>
            {emptyHabits(habits) ? (
                <EmptyPrompt text="No habits have been added for today" />
            ) : (
                <GrowScrollView contentContainerStyle={Padding}>
                    {todaysHabits.map(habit => (
                        <MemoizedHabit
                            key={habit.id}
                            habit={habit}
                            dispatchHabits={dispatchHabits}
                            navigation={navigation}
                            dateIndex={dateIndex}
                        />
                    ))}
                </GrowScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
