import { getProgress, IHabit } from 'Controllers/HabitController/HabitController';
import { Action, habitReducer } from 'Controllers/HabitController/HabitReducer';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AppContext } from 'Context/AppContext';
import RightActions, { renderRightActions } from './RightActions';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Easing,
} from 'react-native';
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
import { GradientColours } from 'Styles/Colours';
import LinearGradient from 'react-native-linear-gradient';

const HabitMaxInterpolation = Dimensions.get('screen').width - 120;
const HabitMaxTransformInterpolation = Dimensions.get('screen').width / 20.5;

const normaliseProgress = (translationX: number, total: number, tempProgress: number): number => {
    const interpolateX = translationX / HabitMaxInterpolation;
    const scaledX = interpolateX * total;
    const progress = tempProgress + scaledX;
    return Math.min(Math.max(progress, 0), total);
};

interface HabitProps {
    navigation: TabNavProps;
    habit: IHabit;
    date: string;
    dateIndex: number;
}

// Habit to update the habit stored in state if the user edits the habit
// const updateHabitState = (
//     initialHabit: IHabit,
//     habit: IHabit,
//     habitDispatch: React.Dispatch<Action>,
//     date: string,
// ): void => {
//     // Updating name
//     initialHabit.name !== habit.name && habitDispatch({ type: 'name', payload: { name: initialHabit.name } });
//     // Updating colour
//     initialHabit.colour !== habit.colour && habitDispatch({ type: 'colour', payload: { colour: initialHabit.colour } });
//     // Updating icon
//     initialHabit.icon !== habit.icon && habitDispatch({ type: 'icon', payload: { icon: initialHabit.icon } });
//     // Updating total
//     initialHabit.total !== habit.total && habitDispatch({ type: 'total', payload: { total: initialHabit.total } });
//     // Updating schedule
//     initialHabit.schedule !== habit.schedule &&
//         habitDispatch({ type: 'schedule', payload: { schedule: initialHabit.schedule } });
//     // // Updating progress
//     // initialHabit.dates[date] &&
//     //     habit.dates[date] &&
//     //     initialHabit.dates[date].progress !== habit.dates[date].progress &&
//     //     habitDispatch({ type: 'progress', payload: { date: date, progress: initialHabit.dates[date].progress } });
// };

const Habit: React.FC<HabitProps> = ({ navigation, habit, date, dateIndex }) => {
    // Thene styles
    const theme = useTheme();

    // Initial render ref
    const mountRef = useRef<boolean>(false);

    // Setting initial mount ref back to false when days change
    useEffect(() => {
        mountRef.current = false;
    }, [date]);

    // Habit and context actions
    const { updateHabit, deleteHabit } = useContext(AppContext);
    // const [habit, habitDispatch] = useReducer(habitReducer, initialHabit);
    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    // Progress
    const [progress, setProgress] = useState(getProgress(habit, date));
    const [tempProgress, setTempProgress] = useState(progress);
    const progressOffset = useMemo(() => (habit.type === 'time' ? 0.5 : 0.5), [habit.type]);
    const progressInterval = useMemo(() => progressOffset * 2, [progressOffset]);

    // Gestures
    const swipableRef = useRef<Swipeable>(null);
    const panRef = useRef<PanGestureHandler>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Animations
    const progressAnimation = useRef(new Animated.Value(progress)).current;
    const progressInterpolation = progressAnimation.interpolate({
        inputRange: [0, habit.total],
        outputRange: [1, HabitMaxTransformInterpolation],
    });

    const animateProgress = useCallback(() => {
        Animated.timing(progressAnimation, {
            toValue: progress,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start();
    }, [progress, progressAnimation]);

    // Updating progress from initial habit
    useEffect(() => {
        setProgress(getProgress(habit, date));
    }, [date]);

    // Animating progress and providing haptic feedback
    useEffect(() => {
        !isDragging && animateProgress();

        if (mountRef.current) {
            // Habit feedback
            progress === habit.total
                ? ReactNativeHapticFeedback.trigger('notificationSuccess')
                : ReactNativeHapticFeedback.trigger('impactMedium');
        } else {
            mountRef.current = true;
        }

        !isDragging &&
            updateHabit({
                ...habit,
                dates: {
                    ...habit.dates,
                    [date]: { progressTotal: habit.total, progress: progress },
                },
            });
        // Disabling exhausting dependencies which causes infinite re-renders when using context values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, progressAnimation]);

    // View the current habit
    const handleView = (): void => {
        navigation.navigate('View', { id: habit.id, name: habit.name, colour: habit.colour, prevIndex: dateIndex });
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    // Gesture handler
    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        if (event.nativeEvent.velocityX > 1000) {
            setProgress(habit.total);
            // habitDispatch({ type: 'progress', payload: { date: date, progress: habit.total } });
            return;
        }

        const progressNormalised = normaliseProgress(event.nativeEvent.translationX, habit.total, tempProgress);
        progressAnimation.setValue(progressNormalised);

        if (progressNormalised >= progress + progressOffset) {
            setProgress(progress + progressInterval);
            // habitDispatch({ type: 'progress', payload: { date: date, progress: progress + progressInterval } });
        } else if (progressNormalised <= progress - progressOffset) {
            setProgress(progress - progressInterval);
            // habitDispatch({ type: 'progress', payload: { date: date, progress: progress - progressInterval } });
        }
    };

    // Gesture state change handler
    const handleGestureChange = useCallback(
        (event: PanGestureHandlerGestureEvent) => {
            if (event.nativeEvent.state === State.BEGAN) {
                setIsDragging(true);
            } else if (event.nativeEvent.state === State.END) {
                setIsDragging(false);
                animateProgress();
                updateHabit(habit);
            }
        },
        // Disabling exhausting dependencies which causes infinite re-renders when using context values
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [habit, animateProgress, progress],
    );

    //
    const handlePress = (): void => {
        setTempProgress(progress >= habit.total ? 0 : progress + 1);
        setProgress(progress >= habit.total ? 0 : progress + 1);
        // habitDispatch({
        //     type: 'progress',
        //     payload: { date: date, progress: progress >= habit.total ? 0 : progress + 1 },
        // });
    };

    return (
        <Swipeable
            ref={swipableRef}
            waitFor={panRef}
            renderRightActions={progress =>
                renderRightActions(swipableRef, progress, habit.id, navigation, deleteHabit)
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
                    <TouchableWithoutFeedback onPress={handleView}>
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
                            <Icon family="entypo" name="check" size={18} colour={theme.text} />
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

export default Habit;
