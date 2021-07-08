import styled from '@emotion/native';
import { normaliseProgress } from 'Components/Habit/Habit.functions';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import { Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';
import { FullCenter } from 'Styles/Globals';
import { EVERYDAY_SCHEDULE } from 'Types/Habit.constants';
import { HabitObject } from 'Types/Habit.types';
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
import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import { OnboardingNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { useOnboarded } from 'Context/AppContext';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';

const delay = (duration: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), duration);
    });
};

/* Interfaces/types */
type Stage = 'count' | 'multiple' | 'drag' | 'complete';

/* Constants */
const Habit: HabitObject = {
    id: 'onboard',
    name: 'Learn Habitual',
    icon: { family: 'materialcommunity', name: 'school' },
    total: 1,
    colour: 'TANGERINE',
    type: 'count',
    dates: {},
    schedule: { ...EVERYDAY_SCHEDULE },
    reminders: [],
    order: 1,
};

const gradient = Gradients[Habit.colour];
const progressOffset = 0.5;
const progressInterval = 1;

/* Styles */
export const Title = styled.Text`
    font-family: ${fontFamily};
    font-size: 30px;
    margin-bottom: 80px;
    margin-top: 100px;
    color: ${props => props.theme.text};
`;

export const SubTitle = styled(Animated.Text)`
    font-family: ${fontFamily};
    font-size: 18px;
    margin-top: 30px;
    text-align: center;
    height: 80px;
    padding: 0px 10px;
    color: ${props => props.theme.text};
`;

export const GetStarted = styled(Animated.View)`
    overflow: hidden;
    margin-top: 20px;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const GetStartedText = styled.Text`
    font-family: ${fontFamily};
    font-size: 20px;
    text-align: center;
    color: ${props => props.theme.text};
`;

const OnboardingHabit: FC = () => {
    const theme = useTheme();
    const navigation = useNavigation<OnboardingNavProps>();
    const [, dispatchOnboarded] = useOnboarded();

    const handleOnClosePress = (): void => {
        ReactNativeHapticFeedback.trigger('impactMedium');
        dispatchOnboarded(true);
        navigation.dispatch(StackActions.replace('Tabs'));
    };

    // Gestures
    const panRef = useRef<PanGestureHandler>(null);
    const swipableRef = useRef<Swipeable>(null);

    // Progress
    const [progress, setProgress] = useState(0);
    const [dragProgress, setDragProgress] = useState(progress);
    const [isDragging, setIsDragging] = useState(false);

    // ------------------------------------------------------------------------------------------------
    // Animations
    // ------------------------------------------------------------------------------------------------
    const animateContainer = useSharedValue(1);
    const animateColour = useSharedValue(1);
    const stageOpacity = useSharedValue(1);
    const startOpacity = useSharedValue(0);

    const containerStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateContainer.value }] }));
    const colourStyle = useAnimatedStyle(() => ({ transform: [{ scale: animateColour.value }] }));
    const stageStyle = useAnimatedStyle(() => ({ opacity: stageOpacity.value }));
    const startStyle = useAnimatedStyle(() => ({ opacity: startOpacity.value }));

    // Stages
    const [habit, setHabit] = useState(Habit);
    const [stage, setStage] = useState<Stage>('count');
    const [stageText, setStageText] = useState('Tap the circle to check off your habit');

    const fadeTransition = (): void => {
        stageOpacity.value = withSequence(
            withTiming(0, { duration: 500 }),
            withDelay(500, withTiming(1, { duration: 500 })),
        );
    };

    // Animating progress when habit is updated
    useEffect(() => {
        if (!isDragging) {
            animateContainer.value = withSequence(
                withTiming(1.03, { duration: 200 }),
                withTiming(1, { duration: 200 }),
            );
            animateColour.value = withTiming(interpolate(progress, [0, habit.total], [1, 20], Extrapolate.CLAMP), {
                duration: 500,
                easing: Easing.out(Easing.quad),
            });
        }
    }, [animateColour, animateContainer, habit.total, isDragging, progress]);

    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        if (stage === 'drag' || stage === 'complete') {
            const progressNormalised = normaliseProgress(event.nativeEvent.translationX, habit.total, dragProgress);
            animateColour.value = interpolate(progressNormalised, [0, habit.total], [1, 20], Extrapolate.CLAMP);

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
        }
    };

    // Gesture state change handler
    const handleGestureChange = (event: PanGestureHandlerGestureEvent): void => {
        if (event.nativeEvent.state === State.BEGAN && event.nativeEvent.translationX > 10) {
            setIsDragging(true);
        } else if (event.nativeEvent.state === State.END) {
            animateColour.value = withTiming(interpolate(progress, [0, habit.total], [1, 20], Extrapolate.CLAMP));
            setDragProgress(progress);
            setIsDragging(false);
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
    };

    // Habit add button handler
    const handlePress = (): void => {
        const next = progress >= habit.total ? 0 : progress + progressInterval;

        setProgress(next);
        setDragProgress(next);

        if (stage === 'count') {
            (async () => {
                ReactNativeHapticFeedback.trigger('notificationSuccess');
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
        } else if (stage === 'multiple') {
            if (progress + 1 === habit.total) {
                (async () => {
                    ReactNativeHapticFeedback.trigger('notificationSuccess');
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
                })();
            } else {
                ReactNativeHapticFeedback.trigger('impactMedium');
            }
        }
    };

    return (
        <View style={[FullCenter, { width: Dimensions.get('screen').width - 40 }]}>
            <Title>Habitual in action.</Title>

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
                            <HabitIconContainer>
                                <Icon
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={18}
                                    colour={theme.colors.text}
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
                                <HabitText
                                    disabled={true}
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
                        <TouchableOpacity onPress={handlePress} style={HabitProgressButton} disabled={stage === 'drag'}>
                            {progress >= habit.total ? (
                                <Icon family="entypo" name="check" size={20} colour={theme.colors.text} />
                            ) : progress > 0 ? (
                                <HabitProgressText>
                                    {progress}/{habit.total}
                                </HabitProgressText>
                            ) : (
                                <Icon family="fontawesome" name="circle-o" size={12} colour={theme.colors.text} />
                            )}
                        </TouchableOpacity>
                    </HabitContainer>
                </PanGestureHandler>
            </Swipeable>
            <SubTitle style={stageStyle}>{stageText}</SubTitle>
            <TouchableOpacity
                style={{ width: '90%', height: 50 }}
                disabled={stage !== 'complete'}
                onPress={handleOnClosePress}
            >
                {stage === 'complete' && (
                    <GetStarted style={startStyle}>
                        <LinearGradient
                            colors={[gradient.start, gradient.end]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                        <GetStartedText>Get Started</GetStartedText>
                    </GetStarted>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingHabit;
