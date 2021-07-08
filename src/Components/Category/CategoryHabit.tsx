import { useTheme } from '@emotion/react';
import {
    HabitContentContainer,
    HabitIconContainer,
    HabitIcon,
    HabitTextContainer,
    HabitProgressButton,
    HabitColourContainer,
} from 'Components/Habit/Habit.styles';
import Icon from 'Components/Icon';
import { useHabits } from 'Context/AppContext';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
import { CategoryHabitContainer, CategoryHabitText, CategorySubText } from './Category.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { deleteAlert } from 'Helpers/DeleteAlert';
import { HabitObject } from 'Types/Habit.types';
import { HabitMaxTransformInterpolation } from 'Components/Habit/Habit.functions';
import { habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { getTime } from 'Helpers/Habits';
import {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface CategoryHabitProps {
    habit: HabitObject;
}

const CategoryHabit: React.FC<CategoryHabitProps> = ({ habit }) => {
    const theme = useTheme();
    const [habits, dispatchHabits] = useHabits();

    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);
    const getAnimationValue = useCallback(() => {
        return habits[habit.id] ? 1 : 0;
    }, [habit.id, habits]);

    const [checked, setChecked] = useState(getAnimationValue());

    const animateColour = useSharedValue(1);
    const colourStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateColour.value }] }));

    // Animate progress
    useEffect(() => {
        animateColour.value = withTiming(interpolate(checked, [0, 1], [1, 20]), {
            duration: 500,
            easing: Easing.out(Easing.quad),
        });
    }, [animateColour, checked]);

    const handleDelete = (): void => {
        dispatchHabits(habitActions.delete(habit.id));
        setChecked(0);
        ReactNativeHapticFeedback.trigger('notificationSuccess');
    };

    const handlePress = (): void => {
        if (habits[habit.id]) {
            deleteAlert(handleDelete);
        } else {
            ReactNativeHapticFeedback.trigger('notificationSuccess');
            setChecked(1);
            dispatchHabits(habitActions.create(habit));
        }
    };

    return (
        <CategoryHabitContainer>
            <HabitContentContainer>
                <HabitIconContainer>
                    <Icon
                        family={habit.icon.family}
                        name={habit.icon.name}
                        size={18}
                        colour={theme.text}
                        style={HabitIcon}
                    />
                    <HabitColourContainer colour={gradient.solid} style={colourStyle}>
                        <LinearGradient
                            colors={[gradient.start, gradient.end]}
                            locations={[0.3, 1]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0 }}
                        />
                    </HabitColourContainer>
                </HabitIconContainer>

                <HabitTextContainer disabled={true}>
                    <CategoryHabitText>{habit.name}</CategoryHabitText>
                    <CategorySubText colour={Object.keys(habits).includes(habit.id) ? theme.text : gradient.solid}>
                        {habit.type === 'time'
                            ? getTime(habit.total).formatTime
                            : habit.total > 1
                            ? `${habit.total} times `
                            : 'Once '}
                        per day
                    </CategorySubText>
                </HabitTextContainer>
            </HabitContentContainer>
            <TouchableOpacity onPress={handlePress} style={HabitProgressButton}>
                {!habits[habit.id] ? (
                    <Icon family="fontawesome5" name="plus" size={20} colour={theme.text} />
                ) : (
                    <Icon family="feather" name="trash-2" size={24} colour={theme.text} />
                )}
            </TouchableOpacity>
        </CategoryHabitContainer>
    );
};

export default CategoryHabit;
