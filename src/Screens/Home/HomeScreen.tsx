import { useColour, useHabits } from 'Context/AppContext';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { weekArray } from 'Helpers/Dates';
import { getDateHabits } from './HomeScreen.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { Full } from 'Styles/Globals';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedHabit from 'Components/Habit/Habit';
import { addHabit, updateHabitName } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { DEFAULT_HABIT } from 'Types/Habit.constants';

// // Creates constant day text/number values
// const prevDates = [...Array(7).keys()].reverse().map(date => moment().subtract(date, 'day'));

// // Gets the habits for a selected date
// const getSelectedDateHabits = (habits: IAllHabits, selectedDate: Moment): IHabit[] => {
//     return Object.values(habits).filter(
//         habit => habit.schedule[selectedDate.format('ddd').toUpperCase() as ScheduleType] === true,
//     );
// };

// // Gets the alpga value for a selected date
// const getAlphaValue = (habits: IHabit[], selectedDate: string): number => {
//     const completeHabits = habits.filter(
//         habit =>
//             habit.dates[selectedDate] && habit.dates[selectedDate].progress >= habit.dates[selectedDate].progressTotal,
//     );
//     return completeHabits.length === 0 ? 1 : 1 - completeHabits.length / habits.length;
// };

// // Gets all of the alpha values for each habit
// const getAllAlphaValues = (habits: IAllHabits): number[] => {
//     return prevDates.map(date => {
//         const selectedDateHabits = getSelectedDateHabits(habits, date);
//         return getAlphaValue(selectedDateHabits, date.format('YYYY-MM-DD'));
//     });
// };

// // Gets the current title of the page
// const getHeaderTitle = (dayIndex: number): string => {
//     switch (dayIndex) {
//         case 0:
//             return 'Today';
//         case 1:
//             return 'Yesterday';
//         default:
//             return moment().subtract(dayIndex, 'd').format('MMM Do');
//     }
// };

interface HomeScreenProps {
    navigation: TabNavProps;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [habits, dispatchHabits] = useHabits();
    const [colour] = useColour();

    const [dateIndex, setDateIndex] = useState(6);
    const dateHabits = useMemo(() => getDateHabits(habits, weekArray[dateIndex]), [dateIndex, habits]);

    useEffect(() => {
        // dispatchHabits(addHabit({ ...DEFAULT_HABIT, name: 'yes' }));
        // dispatchHabits(updateHabitName('5d1aa1f6-fbaf-4099-ae82-fc0ab5bfecd0', 'new habit'));
        // console.log(habits);
    }, []);

    // console.log(week);

    // const { habits, colour } = useContext(AppContext);

    // const [prevDateIndex, setPrevDateIndex] = useState(0);
    // const allAlphaValues = useMemo(() => getAllAlphaValues(habits), [habits]);

    // useFocusEffect(
    //     useCallback(() => {
    //         const parentNavigation = navigation.getParent();
    //         if (parentNavigation) {
    //             parentNavigation.setOptions({ headerTitle: getHeaderTitle(prevDateIndex) });
    //         }
    //     }, [navigation, prevDateIndex]),
    // );

    // const handlePress = (index: number): void => {
    //     setPrevDateIndex(6 - index);
    //     ReactNativeHapticFeedback.trigger('impactLight');
    // };

    return (
        <View style={Full}>
            <GrowScrollView>
                {dateHabits.map(habit => (
                    <MemoizedHabit
                        key={habit.id}
                        habit={habit}
                        dispatchHabits={dispatchHabits}
                        navigation={navigation}
                        dateIndex={dateIndex}
                    />
                ))}
            </GrowScrollView>
        </View>
    );

    // return (
    //     <View style={{ flex: 1 }}>
    //         <CircleDateContainer>
    //             {prevDates.map((date, index) => (
    //                 <CircleDate
    //                     key={date.format('YYYY-MM-DD')}
    //                     alpha={allAlphaValues[index]}
    //                     handlePress={() => handlePress(index)}
    //                     selected={6 - index === prevDateIndex}
    //                     dayText={date.format('ddd').toUpperCase()}
    //                     dayNumber={date.format('D')}
    //                     colour={colour}
    //                 />
    //             ))}
    //         </CircleDateContainer>
    //         <ScrollView
    //             style={{ flexGrow: 1 }}
    //             contentContainerStyle={HabitScroll}
    //             showsVerticalScrollIndicator={false}
    //         >
    //             {selectedDateHabits.map(habit => (
    //                 <Habit
    //                     key={habit.id}
    //                     habit={habit}
    //                     navigation={navigation}
    //                     date={prevDates[6 - prevDateIndex].format('YYYY-MM-DD')}
    //                     dateIndex={prevDateIndex}
    //                 />
    //             ))}
    //         </ScrollView>
    //     </View>
    // );
};

export default HomeScreen;
