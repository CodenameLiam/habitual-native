import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { renderRightActions } from './RightActions';
import { Animated, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Easing } from 'react-native';
import {
    HabitColourContainer,
    HabitContainer,
    HabitContentContainer,
    HabitIcon,
    HabitIconContainer,
    HabitProgressButton,
    HabitProgressText,
    HabitText,
    HabitTextContainer,
} from './Habit.styles';
import Icon from 'Components/Icon';
import { useTheme } from '@emotion/react';
import { Gradients } from 'Styles/Colours';
import LinearGradient from 'react-native-linear-gradient';
import { weekArray } from 'Helpers/Dates';
import { HabitAction } from 'Reducers/HabitsReducer/HabitsReducer.types';
import { getProgress, HabitMaxTransformInterpolation, handleView, normaliseProgress } from './Habit.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitObject } from 'Types/Habit.types';
import { habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';

interface HabitProps {
    navigation: TabNavProps;
    dateIndex: number;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
}

const Habit: React.FC<HabitProps> = ({ navigation, habit, dispatchHabits, dateIndex }) => {
    // Thene styles
    const theme = useTheme();

    // Gestures
    const panRef = useRef<PanGestureHandler>(null);
    const swipableRef = useRef<Swipeable>(null);

    // Memoized values
    const date = useMemo(() => weekArray[dateIndex].format('YYYY-MM-DD'), [dateIndex]);
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);

    // Progress
    const [progress, setProgress] = useState(getProgress(habit, date));
    const [dragProgress, setDragProgress] = useState(progress);
    const [isDragging, setIsDragging] = useState(false);
    const progressOffset = useMemo(() => (habit.type === 'time' ? 0.5 : 0.5), [habit.type]);
    const progressInterval = useMemo(() => progressOffset * 2, [progressOffset]);

    // Animations
    const progressAnimation = useRef(new Animated.Value(Math.min(progress, habit.total))).current;
    const progressInterpolation = progressAnimation.interpolate({
        inputRange: [0, habit.total],
        outputRange: [1, HabitMaxTransformInterpolation],
    });

    // ------------------------------------------------------------------------------------------------
    // Animations
    // ------------------------------------------------------------------------------------------------
    // Updating progress when date is changed habit
    useEffect(() => {
        const progress = getProgress(habit, date);
        setProgress(progress);
        setDragProgress(progress);
    }, [habit, date]);

    // Animating progress when habit is updated
    useEffect(() => {
        !isDragging &&
            Animated.timing(progressAnimation, {
                toValue: Math.min(progress, habit.total),
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            }).start();
    }, [progress, isDragging, progressAnimation, habit.total]);

    // Habit add button handler
    const handlePress = (): void => {
        const next = progress >= habit.total ? 0 : progress + 1;
        setProgress(next);
        setDragProgress(next);
        dispatchHabits(habitActions.progress(habit.id, date, next, habit.total, next >= habit.total));
    };

    // ------------------------------------------------------------------------------------------------
    // Gestures
    // ------------------------------------------------------------------------------------------------
    // Gesture handler
    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        if (event.nativeEvent.velocityX > 1000) {
            setProgress(habit.total);
            return;
        }
        const progressNormalised = normaliseProgress(event.nativeEvent.translationX, habit.total, dragProgress);
        progressAnimation.setValue(progressNormalised);

        if (progressNormalised >= progress + progressOffset) {
            setProgress(progress + progressInterval);
            ReactNativeHapticFeedback.trigger('impactLight');
        } else if (progressNormalised <= progress - progressOffset) {
            setProgress(progress - progressInterval);
            ReactNativeHapticFeedback.trigger('impactLight');
        }
    };

    // Gesture state change handler
    const handleGestureChange = (event: PanGestureHandlerGestureEvent): void => {
        if (event.nativeEvent.state === State.BEGAN) {
            setIsDragging(true);
        } else if (event.nativeEvent.state === State.END) {
            setDragProgress(progress);
            setIsDragging(false);
            dispatchHabits(habitActions.progress(habit.id, date, progress, habit.total, progress >= habit.total));
        }
    };

    // ------------------------------------------------------------------------------------------------
    // Component
    // ------------------------------------------------------------------------------------------------
    return (
        <Swipeable
            ref={swipableRef}
            waitFor={panRef}
            renderRightActions={progress =>
                renderRightActions(habit.id, navigation, swipableRef, progress, dispatchHabits)
            }
        >
            <PanGestureHandler
                ref={panRef}
                activeOffsetX={[-1000, 20]}
                failOffsetX={[0, 1000]}
                minDeltaX={0}
                onGestureEvent={handleGesture}
                onHandlerStateChange={handleGestureChange}
            >
                <HabitContainer>
                    {/* Left hand side, icon and name */}
                    <TouchableWithoutFeedback onPress={() => handleView(navigation, habit, dateIndex)}>
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
                                <HabitText
                                    scroll={false}
                                    animationType="bounce"
                                    duration={3000}
                                    bounceDelay={1500}
                                    marqueeDelay={1000}
                                    bouncePadding={{ left: 0, right: 0 }}
                                >
                                    {habit.name}
                                </HabitText>
                            </HabitTextContainer>
                        </HabitContentContainer>
                    </TouchableWithoutFeedback>
                    {/* Right hand side, progress button */}
                    <TouchableOpacity onPress={handlePress} style={HabitProgressButton}>
                        {progress >= habit.total ? (
                            <Icon family="entypo" name="check" size={20} colour={theme.text} />
                        ) : progress > 0 ? (
                            <HabitProgressText>
                                {progress}/{habit.total}
                            </HabitProgressText>
                        ) : (
                            <Icon family="fontawesome" name="circle-o" size={12} colour={theme.text} />
                        )}
                    </TouchableOpacity>
                </HabitContainer>
            </PanGestureHandler>
        </Swipeable>
    );
};

const MemoizedHabit = React.memo(Habit);

export default MemoizedHabit;
