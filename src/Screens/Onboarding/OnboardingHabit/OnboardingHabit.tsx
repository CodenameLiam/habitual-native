import { normaliseProgress } from 'Components/Habit/Habit.functions';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import { FullCenter } from 'Styles/Globals';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
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
} from 'Components/Habit/Habit.styles';
import Icon from 'Components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, useNavigation } from '@react-navigation/native';
import { OnboardingNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { useOnboarded } from 'Context/AppContext';
import {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import * as Styles from './OnboardingHabit.styles';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { delay, gradient, Habit } from './OnboardingHabit.constants';
import { useTheme } from '@emotion/react';
import { isTablet } from 'Helpers/Size';

/* Interfaces/types */
type Stage = 'count' | 'multiple' | 'drag' | 'complete';

const OnboardingHabit: FC = () => {
    /* Hooks */
    const theme = useTheme();
    const navigation = useNavigation<OnboardingNavProps>();
    const [, dispatchOnboarded] = useOnboarded();

    /* References */
    const panRef = useRef<PanGestureHandler>(null);
    const swipableRef = useRef<Swipeable>(null);

    /* State */
    const [habit, setHabit] = useState(Habit);
    const [stage, setStage] = useState<Stage>('count');
    const [stageText, setStageText] = useState('Tap the circle to check off your habit');
    const [progress, setProgress] = useState(0);
    const [dragProgress, setDragProgress] = useState(progress);

    /* Animation state */
    const animateContainer = useSharedValue(1);
    const animateColour = useSharedValue(1);
    const stageOpacity = useSharedValue(1);
    const startOpacity = useSharedValue(0);

    /* Animation style */
    const containerStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateContainer.value }] }));
    const colourStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateColour.value }] }));
    const stageStyle = useAnimatedStyle(() => ({ opacity: stageOpacity.value }));
    const startStyle = useAnimatedStyle(() => ({ opacity: startOpacity.value }));

    /* Animate habit progress */
    const animateProgress = useCallback(() => {
        animateColour.value = withTiming(
            interpolate(
                progress,
                [0, habit.total],
                [1, widthPercentageToDP(isTablet() ? 3.6 : 4.5)],
                Extrapolate.CLAMP,
            ),
            {
                duration: 500,
                easing: Easing.out(Easing.quad),
            },
        );
    }, [animateColour, habit.total, progress]);

    /* Habit progress animation */
    useEffect(() => {
        animateProgress();
    }, [animateColour, animateProgress, habit.total, progress]);

    /* Complete onboarding */
    const handleComplete = (): void => {
        dispatchOnboarded(true);
        ReactNativeHapticFeedback.trigger('impactMedium');
        navigation.dispatch(StackActions.replace('Tabs'));
    };

    /* Transition helper text opacity */
    const fadeTransition = useCallback(() => {
        stageOpacity.value = withSequence(
            withTiming(0, { duration: 300 }),
            withDelay(300, withTiming(1, { duration: 300 })),
        );
    }, [stageOpacity]);

    /* Habit progress gesture handler */
    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        if (stage === 'drag' || stage === 'complete') {
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

            if (progressNormalised >= progress + 0.5) {
                setProgress(prev => prev + 1);
                ReactNativeHapticFeedback.trigger('impactLight');
            } else if (progressNormalised <= progress - 0.5) {
                setProgress(prev => prev - 1);
                ReactNativeHapticFeedback.trigger('impactLight');
            }
        }
    };

    /* Gesture state change handler */
    const handleGestureChange = useCallback(
        (event: PanGestureHandlerGestureEvent): void => {
            if (event.nativeEvent.state === State.END) {
                animateProgress();
                setDragProgress(progress);
                if (progress >= habit.total && stage === 'drag') {
                    (async () => {
                        ReactNativeHapticFeedback.trigger('notificationSuccess');
                        fadeTransition();
                        await delay(500);
                        setStageText('Great work! Now you are ready to start building habits of your own.');
                        await delay(800);
                        startOpacity.value = withTiming(1, { duration: 500 });
                        setStage('complete');
                    })();
                }
            }
        },
        [animateProgress, fadeTransition, habit.total, progress, stage, startOpacity],
    );

    /* Habit progress button handler */
    const handlePress = useCallback(() => {
        const nextProgress = progress >= habit.total ? 0 : progress + 1;
        setProgress(nextProgress);
        setDragProgress(nextProgress);
        ReactNativeHapticFeedback.trigger(nextProgress >= habit.total ? 'notificationSuccess' : 'impactMedium');

        switch (stage) {
            case 'count':
                (async () => {
                    fadeTransition();
                    await delay(500);
                    setStageText('Nice!');
                    await delay(1500);
                    fadeTransition();
                    await delay(500);
                    setStageText(
                        'You can also check off a habit multiple times in a single day. Try checking off the habit again',
                    );
                    setProgress(0);
                    setDragProgress(0);
                    setStage('multiple');
                    await delay(500);
                    setHabit({ ...habit, total: 3 });
                })();
                break;
            case 'multiple':
                (async () => {
                    if (nextProgress === habit.total) {
                        fadeTransition();
                        await delay(500);
                        setStageText('Awesome!');
                        await delay(1500);
                        fadeTransition();
                        await delay(500);
                        setStageText('You can also swipe or drag on a habit to check off progress. Try it now');
                        setProgress(0);
                        setDragProgress(0);
                        setStage('drag');
                    }
                })();
                break;
        }
    }, [fadeTransition, habit, progress, stage]);

    return (
        <View style={[FullCenter, { width: Dimensions.get('screen').width - 40 }]}>
            <Styles.Title>Habitual in action.</Styles.Title>
            <Swipeable containerStyle={{ width: '100%' }} ref={swipableRef} waitFor={panRef}>
                <PanGestureHandler
                    ref={panRef}
                    minDeltaX={0}
                    onGestureEvent={handleGesture}
                    onHandlerStateChange={handleGestureChange}
                    enabled={stage === 'drag' || stage === 'complete'}
                >
                    <HabitContainer style={containerStyle}>
                        <HabitContentContainer>
                            <HabitIconContainer style={{ aspectRatio: 1 }}>
                                <Icon
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={widthPercentageToDP(4)}
                                    colour={theme.text}
                                    style={HabitIcon}
                                />
                                <HabitColourContainer colour={gradient.solid} style={[colourStyle, { aspectRatio: 1 }]}>
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
                        <TouchableOpacity
                            onPress={handlePress}
                            style={[HabitProgressButton, { aspectRatio: 1 }]}
                            disabled={stage === 'drag'}
                        >
                            {progress >= habit.total ? (
                                <Icon family="entypo" name="check" size={heightPercentageToDP(2)} colour={theme.text} />
                            ) : progress > 0 ? (
                                <HabitProgressText>
                                    {progress}/{habit.total}
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
            <Styles.SubTitle style={stageStyle}>{stageText}</Styles.SubTitle>

            <Styles.StartTouchable disabled={stage !== 'complete'} onPress={handleComplete}>
                <Styles.StartButton style={startStyle}>
                    <LinearGradient
                        colors={[gradient.start, gradient.end]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                    <Styles.StartButtonText>Get Started</Styles.StartButtonText>
                </Styles.StartButton>
            </Styles.StartTouchable>
        </View>
    );
};

export default OnboardingHabit;
