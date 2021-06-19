import { Moment } from 'moment';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { HabitObject } from 'Types/Habit.types';
import {
    MonthCalendarContainer,
    MonthCell,
    MonthContainer,
    MonthText,
    MonthTextContainer,
} from './CalendarMonth.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colour } from 'Types/Colour.types';
import { useTheme } from '@emotion/react';
import { Gradients } from 'Styles/Colours';
import Icon from 'Components/Icon';
import { MarginRight } from 'Styles/Globals';
import { getColour } from 'Helpers/Habits';

interface CalendarMonthHabitProps {
    habit: HabitObject;
    dates: Moment[];
    navigation: TabNavProps;
}

const CalendarMonthHabit: FC<CalendarMonthHabitProps> = ({ habit, dates, navigation }) => {
    const theme = useTheme();
    const colour = useMemo(() => Gradients[habit.colour].solid, [habit.colour]);

    const handleHabitPress = useCallback(
        (id: string, name: string, colour: Colour) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            navigation.navigate('View', { id, name, colour, dateIndex: 6 });
        },
        [navigation],
    );

    return (
        <TouchableWithoutFeedback onPress={() => handleHabitPress(habit.id, habit.name, habit.colour)}>
            <MonthCalendarContainer>
                <MonthTextContainer>
                    <Icon
                        style={MarginRight}
                        family={habit.icon.family}
                        name={habit.icon.name}
                        size={14}
                        colour={colour}
                    />
                    <MonthText
                        colour={colour}
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
                <MonthContainer>
                    {dates.map((day, index) => (
                        <MonthCell
                            key={index + habit.id}
                            colour={getColour(habit, day.format('YYYY-MM-DD'), colour, theme.card)}
                        />
                    ))}
                </MonthContainer>
            </MonthCalendarContainer>
        </TouchableWithoutFeedback>
    );
};

const MemoizedCalendarMonthHabit = memo(CalendarMonthHabit);

export default MemoizedCalendarMonthHabit;
