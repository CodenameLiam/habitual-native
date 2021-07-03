import styled from '@emotion/native';
import { HabitMaxTransformInterpolation, normaliseProgress } from 'Components/Habit/Habit.functions';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity, Easing } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, Swipeable } from 'react-native-gesture-handler';
import { Gradients, ThemeColours } from 'Styles/Colours';
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
import { StackActions, useNavigation } from '@react-navigation/native';
import { OnboardingNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { useOnboarded } from 'Context/AppContext';

/* Interfaces/types */
type Stage = 'count' | 'multiple' | 'drag' | 'complete';

/* Constants */
const Habit: HabitObject = {
    id: 'onboard',
    name: 'Go for a walk',
    icon: { family: 'materialcommunity', name: 'walk' },
    total: 1,
    colour: 'MIDNIGHT',
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
    color: ${ThemeColours.dark.text};
`;

export const SubTitle = styled(Animated.Text)`
    font-family: ${fontFamily};
    font-size: 18px;
    margin-top: 30px;
    text-align: center;
    height: 80px;
    padding: 0px 10px;
    color: ${ThemeColours.dark.text};
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
    color: ${ThemeColours.dark.text};
`;

const OnboardingHabit: FC = () => {
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

    // Stages
    const [habit, setHabit] = useState(Habit);
    const [stage, setStage] = useState<Stage>('count');
    const [stageText, setStageText] = useState('Tap the circle to check off your habit');
    const stageOpacity = useRef(new Animated.Value(1)).current;
    const startOpacity = useRef(new Animated.Value(0)).current;

    const fadeIn = (): void => {
        Animated.timing(stageOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = (): void => {
        Animated.timing(stageOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const getStarted = (): void => {
        Animated.timing(startOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Animations
    const progressAnimation = useRef(new Animated.Value(Math.min(progress, habit.total))).current;
    const progressInterpolation = progressAnimation.interpolate({
        inputRange: [0, habit.total],
        outputRange: [1, HabitMaxTransformInterpolation],
    });

    // Animating progress when habit is updated
    useEffect(() => {
        !isDragging &&
            Animated.timing(progressAnimation, {
                toValue: Math.min(progress, habit.total),
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            }).start();
    }, [progress, isDragging, progressAnimation]);

    const handleGesture = (event: PanGestureHandlerGestureEvent): void => {
        if (stage === 'drag' || stage === 'complete') {
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
        }
    };

    // Gesture state change handler
    const handleGestureChange = (event: PanGestureHandlerGestureEvent): void => {
        if (event.nativeEvent.state === State.BEGAN) {
            setIsDragging(true);
        } else if (event.nativeEvent.state === State.END) {
            setDragProgress(progress);
            setIsDragging(false);
            if (progress >= habit.total && stage === 'drag') {
                ReactNativeHapticFeedback.trigger('notificationSuccess');
                setStage('complete');
                fadeOut();
                setTimeout(() => {
                    fadeIn();
                    setStageText('Great work! Now you are ready to start building habits of your own.');
                }, 500);
                setTimeout(() => getStarted(), 1000);
            }
        }
    };

    // Habit add button handler
    const handlePress = (): void => {
        const next = progress >= habit.total ? 0 : progress + progressInterval;
        setProgress(next);
        setDragProgress(next);

        if (stage === 'count') {
            ReactNativeHapticFeedback.trigger('notificationSuccess');
            setStage('multiple');
            fadeOut();
            setTimeout(() => {
                fadeIn();
                setStageText('Nice!');
            }, 500);
            setTimeout(() => fadeOut(), 1500);
            setTimeout(() => {
                fadeIn();
                setStageText(
                    'You can also complete a habit multiple times in a single day. Try checking off the habit again',
                );
                setProgress(0);
                setDragProgress(0);
            }, 2000);
            setTimeout(() => {
                setHabit({ ...habit, total: 3 });
            }, 2500);
        } else if (stage === 'multiple') {
            if (progress + 1 === habit.total) {
                ReactNativeHapticFeedback.trigger('notificationSuccess');
                fadeOut();
                setStage('drag');
                setTimeout(() => {
                    fadeIn();
                    setStageText('Awesome!');
                }, 500);
                setTimeout(() => fadeOut(), 1500);
                setTimeout(() => {
                    setProgress(0);
                    setDragProgress(0);
                    fadeIn();
                    setStageText('You can also swipe or drag on a habit to increase progress. Try it now');
                }, 2000);
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
                    activeOffsetX={[-1000, 20]}
                    failOffsetX={[0, 1000]}
                    minDeltaX={0}
                    onGestureEvent={handleGesture}
                    onHandlerStateChange={handleGestureChange}
                >
                    <HabitContainer colour={ThemeColours.dark.card}>
                        <HabitContentContainer>
                            <HabitIconContainer>
                                <Icon
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={18}
                                    colour={ThemeColours.dark.text}
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
                                    colour={ThemeColours.dark.text}
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
                                <Icon family="entypo" name="check" size={20} colour={ThemeColours.dark.text} />
                            ) : progress > 0 ? (
                                <HabitProgressText colour={ThemeColours.dark.text}>
                                    {progress}/{habit.total}
                                </HabitProgressText>
                            ) : (
                                <Icon family="fontawesome" name="circle-o" size={12} colour={ThemeColours.dark.text} />
                            )}
                        </TouchableOpacity>
                    </HabitContainer>
                </PanGestureHandler>
            </Swipeable>
            <SubTitle style={{ opacity: stageOpacity }}>{stageText}</SubTitle>
            <TouchableOpacity
                style={{ width: '90%', height: 50 }}
                disabled={stage !== 'complete'}
                onPress={handleOnClosePress}
            >
                {stage === 'complete' && (
                    <GetStarted style={{ opacity: startOpacity }}>
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