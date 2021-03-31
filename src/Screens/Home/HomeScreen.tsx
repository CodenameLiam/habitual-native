import CircleDate from 'Components/CircleDate/CircleDate';
import { AppContext } from 'Context/AppContext';
import { IAllHabits, IHabit, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment, { Moment } from 'moment';
import React, { useContext, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CircleDateContainer } from './HomeScreen.styles';

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
            habit.dates[selectedDate] && habit.dates[selectedDate].progress === habit.dates[selectedDate].progressTotal,
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

const HomeScreen: React.FC = () => {
    const { habits, colour } = useContext(AppContext);

    const [prevDateIndex, setPrevDateIndex] = useState(0);
    const allAlphaValues = useMemo(() => getAllAlphaValues(habits), [habits]);
    const selectedDateHabits = useMemo(() => getSelectedDateHabits(habits, prevDates[6 - prevDateIndex]), [
        habits,
        prevDateIndex,
    ]);

    return (
        <View>
            <CircleDateContainer>
                {prevDates.map((date, index) => (
                    <CircleDate
                        key={date.format('YYYY-MM-DD')}
                        alpha={allAlphaValues[index]}
                        handlePress={() => setPrevDateIndex(6 - index)}
                        selected={6 - index === prevDateIndex}
                        dayText={date.format('ddd').toUpperCase()}
                        dayNumber={date.format('D')}
                        colour={colour}
                    />
                ))}
            </CircleDateContainer>
            <ScrollView>
                {selectedDateHabits.map(habit => (
                    <Text key={habit.id}>{habit.name}</Text>
                ))}
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
