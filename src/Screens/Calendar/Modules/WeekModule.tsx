import { useTheme } from '@emotion/react';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import Icon from 'Components/Icon';
import {
    getProgress,
    IAllHabits,
    IHabit,
    mergeDates,
    provideFeedback,
    ScheduleType,
} from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Gradients, GreyColours, Colours } from 'Styles/Colours';
import { MarginRight } from 'Styles/Globals';
import {
    WeekCell,
    WeekDayContainer,
    WeekDayText,
    WeekHabitButton,
    WeekHabitContainer,
    WeekHabitText,
} from './WeekModule.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface WeekModuleProps {
    weekIndex: number;
    setWeekIndex: React.Dispatch<React.SetStateAction<number>>;
    habits: IAllHabits;
    colour: string;
    navigation: TabNavProps;
    updateHabit: (habit: IHabit) => Promise<void>;
}

// Returns true if the habit should be disabled
const renderDisabledIcon = (habit: IHabit, day: string, schedule: ScheduleType): boolean => {
    if (habit.dates[day] && habit.dates[day].progress > 0) return false;
    if (!habit.schedule[schedule]) return true;
    return false;
};

// Returns the background colours for the given cell
const getBackgroundColour = (habit: IHabit, date: string, defaultBackground: string): string => {
    if (habit.dates[date] && habit.dates[date].progress > 0) {
        let progress: number | string = habit.dates[date].progress / habit.dates[date].progressTotal;
        progress = (Math.round(progress * 10) / 10) * 100;
        if (progress <= 10) progress = 20;
        if (progress >= 100) progress = '';

        return Gradients[habit.colour].solid + progress;
    }

    return defaultBackground;
};

const WeekModule: React.FC<WeekModuleProps> = ({
    weekIndex,
    setWeekIndex,
    navigation,
    habits,
    colour,
    updateHabit,
}) => {
    const theme = useTheme();

    const weekStart = moment().add(weekIndex, 'w').startOf('isoWeek');
    const weekEnd = moment().add(weekIndex, 'w').endOf('isoWeek');

    const prevDates = [...Array(7).keys()].reverse().map(date => weekEnd.clone().subtract(date, 'day'));

    const handleHabitPress = useCallback(
        (id: string, name: string, colour: Colours, prevIndex: number) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            navigation.navigate('View', { id, name, colour, prevIndex });
        },
        [navigation],
    );

    const handleCellPress = useCallback(
        (habit: IHabit, date: string) => {
            const progress = getProgress(habit, date);
            provideFeedback(habit, progress >= habit.total ? 0 : habit.total);
            updateHabit({ ...habit, dates: mergeDates(habit, date, progress >= habit.total ? 0 : habit.total) });
        },
        [updateHabit],
    );

    return (
        <View style={{ flex: 1 }}>
            <ArrowControls
                colour={colour}
                title={`${weekStart.format('MMM Do')} - ${weekEnd.format('MMM Do, YYYY')}`}
                onLeftPress={() => setWeekIndex(weekIndex - 1)}
                onRightPress={() => setWeekIndex(weekIndex + 1)}
                onTitlePress={() => setWeekIndex(0)}
                rightDisabled={weekIndex === 0}
            />
            <WeekDayContainer>
                {prevDates.map((day, index) => (
                    <WeekCell key={index} disabled={true} colour={theme.card}>
                        <WeekDayText>{day.format('dd')[0]}</WeekDayText>
                    </WeekCell>
                ))}
            </WeekDayContainer>
            <ScrollView style={{ flexGrow: 1 }}>
                {Object.values(habits).map(habit => {
                    const habitColour = Gradients[habit.colour].solid;
                    return (
                        <WeekHabitContainer key={habit.id}>
                            <WeekHabitButton onPress={() => handleHabitPress(habit.id, habit.name, habit.colour, 0)}>
                                <Icon
                                    style={MarginRight}
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={14}
                                    colour={habitColour}
                                />
                                <WeekHabitText
                                    colour={habitColour}
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
                            {prevDates.map((day, index) => (
                                <WeekCell
                                    key={index}
                                    colour={getBackgroundColour(habit, day.format('YYYY-MM-DD'), theme.card)}
                                    onPress={() => handleCellPress(habit, day.format('YYYY-MM-DD'))}
                                    disabled={day.isAfter(moment().add(1, 'd'))}
                                >
                                    {renderDisabledIcon(
                                        habit,
                                        day.format('YYYY-MM-DD'),
                                        day.format('ddd').toUpperCase() as ScheduleType,
                                    ) && (
                                        <Icon family="fontawesome" name="minus" size={16} colour={GreyColours.GREY2} />
                                    )}
                                </WeekCell>
                            ))}
                        </WeekHabitContainer>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default WeekModule;
