import { HabitScroll } from 'Components/Habit/Habit.styles';
import Habitual from 'Components/Habitual/Habitual';
import { AppContext } from 'Context/AppContext';
import { IAllHabits } from 'Controllers/HabitController/HabitController';
import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { sortDates } from 'Screens/View/Modules/CalendarModule';

// const getPerfectMonths = (habits: IAllHabits): void => {
//     const perfectMonths = [];
//     Object.values(habits).forEach(habit => {
//         const sortedDates = sortDates(Object.keys(habit.dates));
//         console.log(sortedDates);
//     });
// };

const AwardsScreen: React.FC = () => {
    const { habits } = useContext(AppContext);
    // getPerfectMonths(habits);

    return (
        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={HabitScroll} showsVerticalScrollIndicator={false}>
            <Habitual />
        </ScrollView>
    );
};

export default AwardsScreen;
