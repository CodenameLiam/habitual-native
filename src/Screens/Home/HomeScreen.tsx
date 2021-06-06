import { useColour, useHabits } from 'Context/AppContext';
import React, { useEffect, useState, FC, useCallback } from 'react';
import { View } from 'react-native';
import { weekArray } from 'Helpers/Dates';
import { emptyHabits, getHomeScreenData, getHomeTitle } from './HomeScreen.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { Full } from 'Styles/Globals';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedHabit from 'Components/Habit/Habit';
import EmptyPrompt from 'Components/EmptyPrompt/EmptyPrompt';
import { CircleDatesContainer } from './HomeScreen.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useFocusEffect } from '@react-navigation/native';
import MemoizedCircleDate from 'Components/CircleDate/CircleDate';
import { addHabit } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { DEFAULT_HABIT } from 'Types/Habit.constants';

interface HomeScreenProps {
    navigation: TabNavProps;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const [habits, dispatchHabits] = useHabits();
    const [colour] = useColour();

    const [dateIndex, setDateIndex] = useState(6);
    const { todaysHabits, alphaWeekArray } = getHomeScreenData(habits, dateIndex);

    useEffect(() => {
        // dispatchHabits(addHabit({ ...DEFAULT_HABIT, name: 'yaaah' }));
        // dispatchHabits(updateHabitName('5d1aa1f6-fbaf-4099-ae82-fc0ab5bfecd0', 'new habit'));
        // console.log(habits);
    }, []);

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({ headerTitle: getHomeTitle(dateIndex) });
        }, [navigation, dateIndex]),
    );

    const handlePress = useCallback((index: number) => {
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
                        // dayNumber={date.format('D')}
                        // dayText={date.format('ddd').toUpperCase()}
                    />
                ))}
            </CircleDatesContainer>
            {emptyHabits(habits) ? (
                <EmptyPrompt text="No habits have been added for today" />
            ) : (
                <GrowScrollView>
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
