// import { getProgress, IHabit, mergeDates, provideFeedback } from 'Controllers/HabitController/HabitController';
// import { TabNavProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AppContext } from 'Context/AppContext';
import { renderRightActions } from './RightActions';
import {
    Animated,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Easing,
    Text,
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
import { Gradients } from 'Styles/Colours';
import LinearGradient from 'react-native-linear-gradient';
import { weekArray } from 'Helpers/Dates';
import { HabitAction } from 'Reducers/HabitsReducer/HabitsReducer.types';
// import { updateHabitDate, updateHabitName } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { getProgress, handleView } from './Habit.functions';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitObject } from 'Types/Habit.types';
import { habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';

const HabitMaxInterpolation = Dimensions.get('screen').width - 120;
export const HabitMaxTransformInterpolation = Dimensions.get('screen').width / 20.5;

const ceilingProgress = (habit: HabitObject, progress: number): number => {
    return progress >= habit.total ? habit.total : progress;
};

// const normaliseProgress = (translationX: number, total: number, tempProgress: number): number => {
//     const interpolateX = translationX / HabitMaxInterpolation;
//     const scaledX = interpolateX * total;
//     const progress = tempProgress + scaledX;
//     return Math.min(Math.max(progress, 0), total);
// };

interface HabitProps {
    navigation: TabNavProps;
    dateIndex: number;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
}

const Habit: React.FC<HabitProps> = ({ navigation, habit, dispatchHabits, dateIndex }) => {
    // Thene styles
    const theme = useTheme();

    // Memoized values
    const date = useMemo(() => weekArray[dateIndex].format('YYYY-MM-DD'), [dateIndex]);
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);

    // Gestures
    const swipableRef = useRef<Swipeable>(null);
    const panRef = useRef<PanGestureHandler>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Progress
    const [progress, setProgress] = useState(getProgress(habit, date));
    const [tempProgress, setTempProgress] = useState(progress);
    const progressOffset = useMemo(() => (habit.type === 'time' ? 0.5 : 0.5), [habit.type]);
    const progressInterval = useMemo(() => progressOffset * 2, [progressOffset]);

    // Animations
    const progressAnimation = useRef(new Animated.Value(ceilingProgress(habit, progress))).current;
    const progressInterpolation = progressAnimation.interpolate({
        inputRange: [0, habit.total],
        outputRange: [1, HabitMaxTransformInterpolation],
    });

    // Animate progress
    const animateProgress = useCallback(
        (localProgress?: number) => {
            Animated.timing(progressAnimation, {
                toValue: ceilingProgress(habit, localProgress ?? progress),
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            }).start();
        },
        [habit, progress, progressAnimation],
    );

    // Check for animation requirements
    useEffect(() => {
        !isDragging && animateProgress();
    }, [animateProgress, isDragging]);

    // Updating progress from initial habit
    useEffect(() => {
        const newProgress = getProgress(habit, date);
        setProgress(newProgress);
        setTempProgress(newProgress);
    }, [habit, date]);

    // // View the current habit
    // const handleView = (): void => {
    //     navigation.navigate('View', { id: habit.id, name: habit.name, colour: habit.colour, date });
    //     ReactNativeHapticFeedback.trigger('impactLight');
    // };

    //
    const handlePress = (): void => {
        const next = progress >= habit.total ? 0 : progress + 1;
        setTempProgress(next);
        setProgress(next);
        // provideFeedback(habit, progress >= habit.total ? 0 : progress + 1);
        animateProgress(next);
        dispatchHabits(habitActions.progress(habit.id, date, next, habit.total, next >= habit.total));
    };

    return (
        <Swipeable
            ref={swipableRef}
            waitFor={panRef}
            renderRightActions={progress =>
                renderRightActions(habit.id, navigation, swipableRef, progress, dispatchHabits)
            }
        >
            <HabitContainer>
                {/* Left hand side, icon and name */}
                <TouchableWithoutFeedback
                    onPress={() => handleView(navigation, habit.id, habit.name, habit.colour, date)}
                >
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
        </Swipeable>
    );

    // // Habit and context actions
    // const { updateHabit, deleteHabit } = useContext(AppContext);
    // const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    // // Progress
    // const [progress, setProgress] = useState(getProgress(habit, date));
    // const [tempProgress, setTempProgress] = useState(progress);
    // const progressOffset = useMemo(() => (habit.type === 'time' ? 0.5 : 0.5), [habit.type]);
    // const progressInterval = useMemo(() => progressOffset * 2, [progressOffset]);

    // // Gestures
    // const swipableRef = useRef<Swipeable>(null);
    // const panRef = useRef<PanGestureHandler>(null);
    // const [isDragging, setIsDragging] = useState(false);

    // // Animations
    // const progressAnimation = useRef(new Animated.Value(ceilingProgress(habit, progress))).current;
    // const progressInterpolation = progressAnimation.interpolate({
    //     inputRange: [0, habit.total],
    //     outputRange: [1, HabitMaxTransformInterpolation],
    // });

    // // Animate progress
    // const animateProgress = useCallback(
    //     (localProgress?: number) => {
    //         Animated.timing(progressAnimation, {
    //             toValue: ceilingProgress(habit, localProgress ?? progress),
    //             duration: 500,
    //             useNativeDriver: true,
    //             easing: Easing.out(Easing.quad),
    //         }).start();
    //     },
    //     [habit, progress, progressAnimation],
    // );

    // // Check for animation requirements
    // useEffect(() => {
    //     !isDragging && animateProgress();
    // }, [animateProgress, isDragging]);

    // // Updating progress from initial habit
    // useEffect(() => {
    //     const newProgress = getProgress(habit, date);
    //     setProgress(newProgress);
    //     setTempProgress(newProgress);
    // }, [habit, date]);

    // // View the current habit
    // const handleView = (): void => {
    //     navigation.navigate('View', { id: habit.id, name: habit.name, colour: habit.colour, prevIndex: dateIndex });
    //     ReactNativeHapticFeedback.trigger('impactLight');
    // };

    // // Gesture handler
    // const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
    //     if (event.nativeEvent.velocityX > 1000) {
    //         setProgress(habit.total);
    //         provideFeedback(habit, habit.total);
    //         return;
    //     }

    //     const progressNormalised = normaliseProgress(event.nativeEvent.translationX, habit.total, tempProgress);
    //     progressAnimation.setValue(progressNormalised);

    //     if (progressNormalised >= progress + progressOffset) {
    //         setProgress(progress + progressInterval);
    //         provideFeedback(habit, progress + progressInterval);
    //     } else if (progressNormalised <= progress - progressOffset) {
    //         setProgress(progress - progressInterval);
    //         provideFeedback(habit, progress - progressInterval);
    //     }
    // };

    // // Gesture state change handler
    // const handleGestureChange = useCallback(
    //     (event: PanGestureHandlerGestureEvent) => {
    //         if (event.nativeEvent.state === State.BEGAN) {
    //             setIsDragging(true);
    //         } else if (event.nativeEvent.state === State.END) {
    //             setTempProgress(progress);
    //             setIsDragging(false);
    //             animateProgress();
    //             updateHabit({ ...habit, dates: mergeDates(habit, date, progress) });
    //         }
    //     },
    //     // Disabling exhausting dependencies which causes infinite re-renders when using context values
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [habit, animateProgress, progress],
    // );

    // //
    // const handlePress = (): void => {
    //     setTempProgress(progress >= habit.total ? 0 : progress + 1);
    //     setProgress(progress >= habit.total ? 0 : progress + 1);
    //     provideFeedback(habit, progress >= habit.total ? 0 : progress + 1);
    //     animateProgress(progress >= habit.total ? 0 : progress + 1);
    //     updateHabit({
    //         ...habit,
    //         dates: mergeDates(habit, date, progress >= habit.total ? 0 : progress + 1),
    //     });
    // };

    // return (
    //     <Swipeable
    //         ref={swipableRef}
    //         waitFor={panRef}
    //         renderRightActions={progress =>
    //             renderRightActions(swipableRef, progress, habit.id, navigation, deleteHabit)
    //         }
    //     >
    //         <PanGestureHandler
    //             ref={panRef}
    //             activeOffsetX={[-1000, 20]}
    //             failOffsetX={[0, 1000]}
    //             minDeltaX={0}
    //             onGestureEvent={handleGesture}
    //             onHandlerStateChange={handleGestureChange}
    //         >
    //             <HabitContainer>
    //                 {/* Left hand side, icon and name */}
    //                 <TouchableWithoutFeedback onPress={handleView}>
    //                     <HabitContentContainer>
    //                         <HabitIconContainer>
    //                             <Icon
    //                                 family={habit.icon.family}
    //                                 name={habit.icon.name}
    //                                 size={18}
    //                                 colour={theme.text}
    //                                 style={HabitIcon}
    //                             />
    //                             <HabitColourContainer
    //                                 colour={gradient.solid}
    //                                 style={{ transform: [{ scale: progressInterpolation }] }}
    //                             >
    //                                 <LinearGradient
    //                                     colors={[gradient.start, gradient.end]}
    //                                     locations={[0.3, 1]}
    //                                     style={StyleSheet.absoluteFill}
    //                                     start={{ x: 0, y: 0.5 }}
    //                                     end={{ x: 1, y: 0 }}
    //                                 />
    //                             </HabitColourContainer>
    //                         </HabitIconContainer>
    //                         <HabitTextContainer>
    //                             <HabitText
    //                                 scroll={false}
    //                                 animationType="bounce"
    //                                 duration={3000}
    //                                 bounceDelay={1500}
    //                                 marqueeDelay={1000}
    //                                 bouncePadding={{ left: 0, right: 0 }}
    //                             >
    //                                 {habit.name}
    //                             </HabitText>
    //                         </HabitTextContainer>
    //                     </HabitContentContainer>
    //                 </TouchableWithoutFeedback>
    //                 {/* Right hand side, progress button */}
    //                 <TouchableOpacity onPress={handlePress} style={HabitProgressButton}>
    //                     {progress >= habit.total ? (
    //                         <Icon family="entypo" name="check" size={20} colour={theme.text} />
    //                     ) : progress > 0 ? (
    //                         <HabitProgressText>
    //                             {progress}/{habit.total}
    //                         </HabitProgressText>
    //                     ) : (
    //                         <Icon family="fontawesome" name="circle-o" size={12} colour={theme.text} />
    //                     )}
    //                 </TouchableOpacity>
    //             </HabitContainer>
    //         </PanGestureHandler>
    //     </Swipeable>
    // );
};

const MemoizedHabit = React.memo(Habit);

export default MemoizedHabit;
