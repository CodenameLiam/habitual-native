import ArrowControls from 'Components/ArrowControls/ArrowControls';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedYearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import { getDateArray } from 'Helpers/Dates';
import moment from 'moment';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, Suspense, useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Gradients } from 'Styles/Colours';
import { Full } from 'Styles/Globals';
import { Colour } from 'Types/Colour.types';
import { Habits } from 'Types/Habit.types';

interface CalendarYearProps {
    habits: Habits;
    colour: string;
    navigation: TabNavProps;
}

const CalendarYear: FC<CalendarYearProps> = ({ habits, colour, navigation }) => {
    const [yearIndex, setYearIndex] = useState<number>(0);
    const year = useMemo(() => moment().add(yearIndex, 'year'), [yearIndex]);
    const dates = useMemo(
        () => getDateArray(year.clone().startOf('y').add(1, 'd'), year.clone().endOf('y').add(1, 'd')),
        [year],
    );

    const handleHabitPress = useCallback(
        (id: string, name: string, colour: Colour) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            navigation.navigate('View', { id, name, colour, dateIndex: 6 });
        },
        [navigation],
    );

    return (
        <View style={Full}>
            <ArrowControls
                colour={colour}
                title={`${year.format('YYYY')}`}
                onLeftPress={() => setYearIndex(yearIndex - 1)}
                onRightPress={() => setYearIndex(yearIndex + 1)}
                onTitlePress={() => setYearIndex(0)}
                rightDisabled={yearIndex === 0}
            />
            <GrowScrollView>
                {Object.values(habits).map((habit, index) => {
                    const colour = Gradients[habit.colour].solid;
                    return (
                        <TouchableWithoutFeedback
                            key={habit.id}
                            onPress={() => handleHabitPress(habit.id, habit.name, habit.colour)}
                        >
                            <MemoizedYearlyCalendar habit={habit} colour={colour} yearArray={dates} />
                        </TouchableWithoutFeedback>
                    );
                })}
            </GrowScrollView>
        </View>
    );
};

export default CalendarYear;
