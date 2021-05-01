import ArrowControls from 'Components/ArrowControls/ArrowControls';
import Icon from 'Components/Icon';
import MonthlyCalendar from 'Components/MonthlyCalendar/MonthlyCalendar';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { IAllHabits, IHabit } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { GradientColours, IColours } from 'Styles/Colours';
import { MarginRight } from 'Styles/Globals';
import { AllMonthContainer, MonthCalendarContainer, MonthText, MonthTextContainer } from './MonthModule.styles';

interface MonthModuleProps {
    monthIndex: number;
    setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
    habits: IAllHabits;
    colour: string;
    navigation: TabNavProps;
}

const MonthModule: React.FC<MonthModuleProps> = ({ monthIndex, setMonthIndex, navigation, habits, colour }) => {
    const month = moment().add(monthIndex, 'month');

    const handleHabitPress = useCallback(
        (id: string, name: string, colour: IColours, prevIndex: number) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            navigation.navigate('View', { id, name, colour, prevIndex });
        },
        [navigation],
    );

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
                    {Object.values(habits).map(habit => {
                        const habitColour = GradientColours[habit.colour].solid;
                        return (
                            <TouchableWithoutFeedback
                                key={habit.id}
                                onPress={() => handleHabitPress(habit.id, habit.name, habit.colour, 0)}
                            >
                                <MonthCalendarContainer>
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
                            </TouchableWithoutFeedback>
                        );
                    })}
                </AllMonthContainer>
            </ScrollView>
        </View>
    );
};

export default MonthModule;
