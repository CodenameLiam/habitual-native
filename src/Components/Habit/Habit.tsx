import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { renderRightActions } from './RightActions';
import { Animated, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Text } from 'react-native';
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
import { HabitMaxTransformInterpolation, handleView, normaliseProgress } from './Habit.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitObject } from 'Types/Habit.types';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { getProgress, getTime, getTimeInterval } from 'Helpers/Habits';
import {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
    withSequence,
    interpolate,
    interpolateNode,
    Extrapolate,
} from 'react-native-reanimated';
import { transform } from '@babel/core';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { isTablet } from 'Helpers/Size';

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
    const { formatTime } = useMemo(() => getTime(progress), [progress]);
    const progressOffset = useMemo(() => (habit.type === 'time' ? getTimeInterval(habit.total) / 2 : 0.5), [
        habit.type,
        habit.total,
    ]);
    const progressInterval = useMemo(() => progressOffset * 2, [progressOffset]);

    // ------------------------------------------------------------------------------------------------
    // Animations
    // ------------------------------------------------------------------------------------------------
    const animateContainer = useSharedValue(1);
    const animateColour = useSharedValue(1);

    const containerStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateContainer.value }] }));
    const colourStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateColour.value }] }));

    // Updating progress when date is changed habit
    useEffect(() => {
        const progress = getProgress(habit, date);
        setProgress(progress);
        setDragProgress(progress);
        animateColour.value = withTiming(
            interpolate(progress, [0, habit.total], [1, widthPercentageToDP(isTablet() ? 4 : 5)], Extrapolate.CLAMP),
            {
                duration: 500,
                easing: Easing.out(Easing.quad),
            },
        );
    }, [habit, date, animateColour]);

    // Habit add button handler
    const handlePress = (): void => {
        animateContainer.value = withSequence(withTiming(1.02, { duration: 200 }), withTiming(1, { duration: 200 }));
        const next = progress >= habit.total ? 0 : progress + progressInterval;
        setProgress(next);
        setDragProgress(next);
        dispatchHabits(habitActions.progress(habit, date, next, next >= habit.total));
    };

    // ------------------------------------------------------------------------------------------------
    // Gestures
    // ------------------------------------------------------------------------------------------------
    // Gesture handler
    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        const progressNormalised = normaliseProgress(event.nativeEvent.translationX, habit.total, dragProgress);
        animateColour.value = interpolate(
            progressNormalised,
            [0, habit.total],
            [1, widthPercentageToDP(isTablet() ? 4 : 5)],
            Extrapolate.CLAMP,
        );

        if (event.nativeEvent.velocityX > 1000) {
            setProgress(habit.total);
            return;
        }

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
        if (event.nativeEvent.state === State.END && event.nativeEvent.translationX > 10) {
            setDragProgress(progress);
            dispatchHabits(habitActions.progress(habit, date, progress, progress >= habit.total));
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
                <HabitContainer style={containerStyle}>
                    {/* Left hand side, icon and name */}
                    <HabitContentContainer>
                        <HabitIconContainer style={{ aspectRatio: 1 }}>
                            <Icon
                                family={habit.icon.family}
                                name={habit.icon.name}
                                size={heightPercentageToDP(2)}
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
                        <HabitTextContainer onPress={() => handleView(navigation, habit, dateIndex)}>
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
                    {/* Right hand side, progress button */}
                    <TouchableOpacity onPress={handlePress} style={[HabitProgressButton, { aspectRatio: 1 }]}>
                        {progress >= habit.total ? (
                            <Icon family="entypo" name="check" size={heightPercentageToDP(2)} colour={theme.text} />
                        ) : progress > 0 ? (
                            <HabitProgressText>
                                {habit.type === 'count' ? `${progress}/${habit.total}` : formatTime}
                            </HabitProgressText>
                        ) : (
                            <Icon
                                family="fontawesome"
                                name="circle-o"
                                size={heightPercentageToDP(1.5)}
                                colour={theme.text}
                            />
                        )}
                    </TouchableOpacity>
                </HabitContainer>
            </PanGestureHandler>
        </Swipeable>
    );
};

const MemoizedHabit = React.memo(Habit);

export default MemoizedHabit;
