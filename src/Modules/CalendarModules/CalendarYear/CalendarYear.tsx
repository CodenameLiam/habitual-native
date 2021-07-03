import ArrowControls from 'Components/ArrowControls/ArrowControls';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import Icon from 'Components/Icon';
import MemoizedYearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import { getDateArray } from 'Helpers/Dates';
import moment from 'moment';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Gradients } from 'Styles/Colours';
import { Full, MarginBottom, MarginRight, RowCenter } from 'Styles/Globals';
import { Colour } from 'Types/Colour.types';
import { HabitObject } from 'Types/Habit.types';
import { useDebouncedCallback } from 'use-debounce/lib';
import { YearHabitText } from './CalendarYear.styles';

interface CalendarYearProps {
    habits: HabitObject[];
    colour: string;
    navigation: TabNavProps;
}

const CalendarYear: FC<CalendarYearProps> = ({ habits, colour, navigation }) => {
    // Debounce progress to improve perceived performance
    const [yearHabits, setYearHabits] = useState(habits);
    const updateStatHabit = useDebouncedCallback((habits: HabitObject[]) => setYearHabits(habits), 500);
    useEffect(() => {
        updateStatHabit(habits);
    }, [habits, updateStatHabit]);

    const [yearIndex, setYearIndex] = useState<number>(0);
    const year = useMemo(() => moment().add(yearIndex, 'year'), [yearIndex]);
    const dates = useMemo(() => getDateArray(year.clone().startOf('y'), year.clone().endOf('y')), [year]);

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
                {yearHabits.map((habit, index) => {
                    const colour = Gradients[habit.colour].solid;
                    return (
                        <TouchableWithoutFeedback
                            key={habit.id}
                            onPress={() => handleHabitPress(habit.id, habit.name, habit.colour)}
                        >
                            <View style={MarginBottom}>
                                <View style={RowCenter}>
                                    <Icon
                                        style={MarginRight}
                                        family={habit.icon.family}
                                        name={habit.icon.name}
                                        size={14}
                                        colour={colour}
                                    />
                                    <YearHabitText colour={colour}>{habit.name}</YearHabitText>
                                </View>
                                <MemoizedYearlyCalendar habit={habit} colour={colour} yearArray={dates} />
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </GrowScrollView>
        </View>
    );
};

export default CalendarYear;
