import ArrowControls from 'Components/ArrowControls/ArrowControls';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import moment from 'moment';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Full } from 'Styles/Globals';
import { Habits } from 'Types/Habit.types';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { Colour } from 'Types/Colour.types';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import { getDateArray } from 'Helpers/Dates';
import { AllMonthContainer } from './CalendarMonth.styles';
import MemoizedCalendarMonthHabit from './CalendarMonthHabit';

interface CalendarMonthProps {
    habits: Habits;
    colour: string;
    navigation: TabNavProps;
}

const CalendarMonth: FC<CalendarMonthProps> = ({ navigation, habits, colour }) => {
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const month = useMemo(() => moment().add(monthIndex, 'month'), [monthIndex]);
    const dates = useMemo(() => getDateArray(month.clone().startOf('month'), month.clone().endOf('month')), [month]);

    return (
        <View style={Full}>
            <ArrowControls
                colour={colour}
                title={`${month.format('MMMM, YYYY')}`}
                onLeftPress={() => setMonthIndex(monthIndex - 1)}
                onRightPress={() => setMonthIndex(monthIndex + 1)}
                onTitlePress={() => setMonthIndex(0)}
                rightDisabled={monthIndex === 0}
            />

            <GrowScrollView>
                <AllMonthContainer>
                    {Object.values(habits).map(habit => (
                        <MemoizedCalendarMonthHabit
                            key={habit.id}
                            habit={habit}
                            dates={dates}
                            navigation={navigation}
                        />
                    ))}
                </AllMonthContainer>
            </GrowScrollView>
            {/* <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <AllMonthContainer>
                    {Object.values(habits).map(habit => {
                        const habitColour = Gradients[habit.colour].solid;
                        return (
                            <TouchableWithoutFeedback
                                key={habit.id}
                                onPress={() => handleHabitPress(habit.id, habit.name, habit.colour, 6)}
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
            </ScrollView> */}
        </View>
    );
};

export default CalendarMonth;
