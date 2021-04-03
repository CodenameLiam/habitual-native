import CircleDate from 'Components/CircleDate/CircleDate';
import Habit from 'Components/Habit/Habit';
import { HabitScroll } from 'Components/Habit/Habit.styles';
import { AppContext } from 'Context/AppContext';
import { IAllHabits, IHabit, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment, { Moment } from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CircleDateContainer } from './HomeScreen.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { v4 } from 'uuid';
import { useFocusEffect } from '@react-navigation/core';

// Creates constant day text/number values
const prevDates = [...Array(7).keys()].reverse().map(date => moment().subtract(date, 'day'));

// Gets the habits for a selected date
const getSelectedDateHabits = (habits: IAllHabits, selectedDate: Moment): IHabit[] => {
    return Object.values(habits).filter(
        habit => habit.schedule[selectedDate.format('ddd').toUpperCase() as ScheduleType] === true,
    );
};

// Gets the alpga value for a selected date
const getAlphaValue = (habits: IHabit[], selectedDate: string): number => {
    const completeHabits = habits.filter(
        habit =>
            habit.dates[selectedDate] && habit.dates[selectedDate].progress >= habit.dates[selectedDate].progressTotal,
    );
    return completeHabits.length === 0 ? 1 : 1 - completeHabits.length / habits.length;
};

// Gets all of the alpha values for each habit
const getAllAlphaValues = (habits: IAllHabits): number[] => {
    return prevDates.map(date => {
        const selectedDateHabits = getSelectedDateHabits(habits, date);
        return getAlphaValue(selectedDateHabits, date.format('YYYY-MM-DD'));
    });
};

// Gets the current title of the page
const getHeaderTitle = (dayIndex: number): string => {
    switch (dayIndex) {
        case 0:
            return 'Today';
        case 1:
            return 'Yesterday';
        default:
            return moment().subtract(dayIndex, 'd').format('MMM Do');
    }
};

interface HomeScreenProps {
    navigation: TabNavProps;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { habits, colour } = useContext(AppContext);

    const [prevDateIndex, setPrevDateIndex] = useState(0);
    const allAlphaValues = useMemo(() => getAllAlphaValues(habits), [habits]);
    const selectedDateHabits = useMemo(() => getSelectedDateHabits(habits, prevDates[6 - prevDateIndex]), [
        habits,
        prevDateIndex,
    ]);

    useFocusEffect(
        useCallback(() => {
            const parentNavigation = navigation.getParent();
            if (parentNavigation) {
                parentNavigation.setOptions({ headerTitle: getHeaderTitle(prevDateIndex) });
            }
        }, [navigation, prevDateIndex]),
    );

    const handlePress = (index: number): void => {
        setPrevDateIndex(6 - index);
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <View>
            <CircleDateContainer>
                {prevDates.map((date, index) => (
                    <CircleDate
                        key={date.format('YYYY-MM-DD')}
                        alpha={allAlphaValues[index]}
                        handlePress={() => handlePress(index)}
                        selected={6 - index === prevDateIndex}
                        dayText={date.format('ddd').toUpperCase()}
                        dayNumber={date.format('D')}
                        colour={colour}
                    />
                ))}
            </CircleDateContainer>
            <ScrollView contentContainerStyle={HabitScroll}>
                {selectedDateHabits.map(habit => (
                    <Habit
                        key={habit.id}
                        habit={habit}
                        navigation={navigation}
                        date={prevDates[6 - prevDateIndex].format('YYYY-MM-DD')}
                        dateIndex={prevDateIndex}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
