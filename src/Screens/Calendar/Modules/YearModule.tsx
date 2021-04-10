import { useTheme } from '@emotion/react';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import Icon from 'Components/Icon';
import YearlyCalendar from 'Components/YearlyCalendar/YearlyCalendar';
import { IAllHabits, IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, InteractionManager } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GradientColours, IColours } from 'Styles/Colours';
import { MarginRight, Row } from 'Styles/Globals';
import { WeekHabitButton, WeekHabitText } from './WeekModule.styles';
import { YearHabitText } from './YearModule.styles';

interface YearModuleProps {
    yearIndex: number;
    setYearIndex: React.Dispatch<React.SetStateAction<number>>;
    habits: IAllHabits;
    colour: string;
    navigation: TabNavProps;
    updateHabit: (habit: IHabit) => Promise<void>;
}

const YearModule: React.FC<YearModuleProps> = ({
    yearIndex,
    setYearIndex,
    habits,
    colour,
    navigation,
    updateHabit,
}) => {
    const theme = useTheme();
    const year = moment().add(yearIndex, 'year');

    const handleHabitPress = useCallback(
        (id: string, name: string, colour: IColours, prevIndex: number) => {
            navigation.navigate('View', { id, name, colour, prevIndex });
        },
        [navigation],
    );

    return (
        <View style={{ flex: 1 }}>
            <ArrowControls
                colour={colour}
                title={`${year.format('YYYY')}`}
                onLeftPress={() => setYearIndex(yearIndex - 1)}
                onRightPress={() => setYearIndex(yearIndex + 1)}
                onTitlePress={() => setYearIndex(0)}
                rightDisabled={yearIndex === 0}
            />
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                {Object.keys(habits).map(id => {
                    const habit = habits[id];
                    const habitColour = GradientColours[habit.colour].solid;
                    return (
                        <TouchableOpacity key={id} onPress={() => handleHabitPress(id, habit.name, habit.colour, 0)}>
                            {/* <WeekHabitButton onPress={() => handleHabitPress(id, habit.name, habit.colour, 0)}> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    style={MarginRight}
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={14}
                                    colour={habitColour}
                                />
                                <YearHabitText colour={habitColour}>{habit.name}</YearHabitText>
                            </View>

                            {/* </WeekHabitButton> */}
                            <YearlyCalendar
                                style={{ marginTop: 10, marginBottom: 25 }}
                                habit={habit}
                                colour={habitColour}
                                yearIndex={yearIndex}
                                fromStart
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default YearModule;
