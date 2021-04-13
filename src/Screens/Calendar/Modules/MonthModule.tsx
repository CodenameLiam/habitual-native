import ArrowControls from 'Components/ArrowControls/ArrowControls';
import Icon from 'Components/Icon';
import MonthlyCalendar from 'Components/MonthlyCalendar/MonthlyCalendar';
import { MonthText } from 'Components/MonthlyCalendar/MonthlyCalendar.styles';
import { IAllHabits, IHabit } from 'Controllers/HabitController/HabitController';
import { useTheme } from 'Controllers/ThemeController';
import moment from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GradientColours } from 'Styles/Colours';
import { MarginRight, Row, RowCenter } from 'Styles/Globals';
import { AllMonthContainer, MonthCalendarContainer, MonthTextContainer } from './MonthModule.styles';

interface MonthModuleProps {
    monthIndex: number;
    setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
    habits: IAllHabits;
    colour: string;
    navigation: TabNavProps;
    updateHabit: (habit: IHabit) => Promise<void>;
}

const MonthModule: React.FC<MonthModuleProps> = ({
    monthIndex,
    setMonthIndex,
    navigation,
    habits,
    colour,
    updateHabit,
}) => {
    const theme = useTheme();
    const month = moment().add(monthIndex, 'month');

    return (
        <View style={{ flex: 1 }}>
            <ArrowControls
                colour={colour}
                title={`${month.format('MMMM, YYYY')}`}
                onLeftPress={() => setMonthIndex(monthIndex - 1)}
                onRightPress={() => setMonthIndex(monthIndex + 1)}
                onTitlePress={() => setMonthIndex(0)}
                rightDisabled={monthIndex === 0}
            />
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <AllMonthContainer>
                    {Object.keys(habits).map(id => {
                        const habit = habits[id];
                        const habitColour = GradientColours[habit.colour].solid;
                        return (
                            <MonthCalendarContainer key={id}>
                                <MonthTextContainer>
                                    <Icon
                                        style={MarginRight}
                                        family={habit.icon.family}
                                        name={habit.icon.name}
                                        size={14}
                                        colour={habitColour}
                                    />
                                    <MonthText
                                        colour={habitColour}
                                        scroll={false}
                                        animationType="bounce"
                                        duration={5000}
                                        bounceDelay={1500}
                                        marqueeDelay={1000}
                                        bouncePadding={{ left: 0, right: 0 }}
                                    >
                                        {habit.name}
                                    </MonthText>
                                </MonthTextContainer>

                                <MonthlyCalendar habit={habit} colour={habitColour} monthIndex={monthIndex} />
                            </MonthCalendarContainer>
                        );
                    })}
                </AllMonthContainer>
            </ScrollView>
        </View>
    );
};

export default MonthModule;
