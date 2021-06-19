import { useTheme } from '@emotion/react';
import Icon from 'Components/Icon';
import { getColour } from 'Helpers/Habits';
import moment, { Moment } from 'moment';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Dispatch, FC, memo, useCallback, useMemo } from 'react';
import { Gradients, GreyColours } from 'Styles/Colours';
import { MarginRight } from 'Styles/Globals';
import { Colour } from 'Types/Colour.types';
import { HabitObject, ScheduleType } from 'Types/Habit.types';
import { renderDisabledIcon } from './CalendarWeekHabit.functions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { WeekHabitContainer, WeekHabitButton, WeekHabitText, WeekCell } from '../CalendarWeek/CalendarWeek.styles';

interface CalendarWeekHabitProps {
    habit: HabitObject;
    dispatchHabits: Dispatch<HabitAction>;
    dates: Moment[];
    navigation: TabNavProps;
}

const CalendarWeekHabit: FC<CalendarWeekHabitProps> = ({ habit, dispatchHabits, dates, navigation }) => {
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
        <WeekHabitContainer>
            <WeekHabitButton onPress={() => handleHabitPress(habit.id, habit.name, habit.colour)}>
                <Icon style={MarginRight} family={habit.icon.family} name={habit.icon.name} size={14} colour={colour} />
                <WeekHabitText
                    colour={colour}
                    scroll={false}
                    animationType="bounce"
                    duration={5000}
                    bounceDelay={1500}
                    marqueeDelay={1000}
                    bouncePadding={{ left: 0, right: 15 }}
                >
                    {habit.name}
                </WeekHabitText>
            </WeekHabitButton>
            {dates.map(day => (
                <WeekCell
                    key={day.format('l')}
                    colour={getColour(habit, day.format('YYYY-MM-DD'), colour, theme.card)}
                    onPress={() => dispatchHabits(habitActions.toggle(habit, day.format('YYYY-MM-DD')))}
                    disabled={day.isAfter(moment().add(1, 'd'))}
                >
                    {renderDisabledIcon(
                        habit,
                        day.format('YYYY-MM-DD'),
                        day.format('ddd').toUpperCase() as ScheduleType,
                    ) && <Icon family="fontawesome" name="minus" size={16} colour={GreyColours.GREY2} />}
                </WeekCell>
            ))}
        </WeekHabitContainer>
    );
};

const MemoizedCalendarWeekHabit = memo(CalendarWeekHabit);

export default MemoizedCalendarWeekHabit;
