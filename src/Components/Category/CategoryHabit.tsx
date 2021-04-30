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
import { AppContext } from 'Context/AppContext';
import { IHabit } from 'Controllers/HabitController/HabitController';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColours } from 'Styles/Colours';
import { CategoryHabitContainer, CategoryHabitText } from './Category.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { HabitMaxTransformInterpolation } from 'Components/Habit/Habit';
import { deleteAlert } from 'Helpers/DeleteAlert';

interface CategoryHabitProps {
    habit: IHabit;
}

const CategoryHabit: React.FC<CategoryHabitProps> = ({ habit }) => {
    const theme = useTheme();
    const { habits, updateHabit, deleteHabit } = useContext(AppContext);

    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);
    const getAnimationValue = useCallback(() => {
        return habits[habit.id] ? 1 : 0;
    }, [habit.id, habits]);

    const [checked, setChecked] = useState(getAnimationValue());

    // Animations
    const progressAnimation = useRef(new Animated.Value(checked)).current;
    const progressInterpolation = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, HabitMaxTransformInterpolation],
    });

    // Animate progress
    useEffect(() => {
        Animated.timing(progressAnimation, {
            toValue: checked,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start();
    }, [checked, progressAnimation]);

    const handleDelete = (): void => {
        deleteHabit(habit.id);
        setChecked(0);
        ReactNativeHapticFeedback.trigger('notificationSuccess');
    };

    const handlePress = (): void => {
        if (habits[habit.id]) {
            deleteAlert(handleDelete);
        } else {
            updateHabit(habit);
            setChecked(1);
            ReactNativeHapticFeedback.trigger('notificationSuccess');
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
                    <HabitColourContainer
                        colour={gradient.solid}
                        style={{ transform: [{ scale: progressInterpolation }] }}
                    >
                        <LinearGradient
                            colors={[gradient.start, gradient.end]}
                            locations={[0.3, 1]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0 }}
                        />
                    </HabitColourContainer>
                </HabitIconContainer>

                <HabitTextContainer>
                    <CategoryHabitText>{habit.name}</CategoryHabitText>
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
