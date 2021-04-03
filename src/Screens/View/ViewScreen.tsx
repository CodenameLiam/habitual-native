import { useTheme } from '@emotion/react';
import { useFocusEffect } from '@react-navigation/core';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import ArrowControls from 'Components/ArrowControls/ArrowControls';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import Icon from 'Components/Icon';
import { AppContext } from 'Context/AppContext';
import { DEFAULT_HABIT } from 'Controllers/HabitController/HabitConstants';
import { getProgress, IHabit } from 'Controllers/HabitController/HabitController';
import { habitReducer } from 'Controllers/HabitController/HabitReducer';
import moment, { Moment } from 'moment';
import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { View, Text, InteractionManager, Dimensions, Animated, Easing } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { concat } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle } from 'react-native-svg';
import { GradientColours } from 'Styles/Colours';
import { RowBetween } from 'Styles/Globals';
import {
    CircleContainer,
    CircleText,
    ViewScreenArrow,
    ViewScreenArrows,
    ViewScreenTitle,
    ViewScreenTitleContainer,
} from './ViewScreen.styles';

// const slides: number[] = [0, 1, 2];

const circleDimensions = Dimensions.get('screen').width - 60;
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 15;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getAlphaValue = (total: number, progress: number): number => {
    if (progress >= total) return 0;
    else return progress === 0 ? 1 : 1 - progress / total;
};

interface ViewScreenProps {
    navigation: ViewNavProps;
    route: ViewRouteProps;
}

const ViewScreen: React.FC<ViewScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();

    // Initial render ref
    const mountRef = useRef<boolean>(false);

    // Habit and context actions
    const { habits, updateHabit } = useContext(AppContext);
    const { id, prevIndex } = route.params;
    const habit = habits[id];

    // const [habit, habitDispatch] = useReducer(habitReducer, habits[id]);
    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    // Updates the header to reflect the current gradient
    // useFocusEffect(
    //     useCallback(() => {
    //         navigation.setOptions({
    //             headerBackground: () => <HeaderBackground colour={habit.colour} />,
    //             headerTitle: habit.name,
    //         });
    //     }, [habit.colour, habit.name, navigation]),
    // );

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: habit.name,
        });
        // console.log(habit);
    }, [navigation, habit.colour, habit.name]);

    // Ready state
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsReady(true);
        });
    }, []);

    // Dates
    const [currentDateIndex, setCurrentDateIndex] = useState(-prevIndex);
    const currentDate = useMemo(() => moment().add(currentDateIndex, 'd'), [currentDateIndex]);
    const currentDateString = useMemo(() => currentDate.format('YYYY-MM-DD'), [currentDate]);

    // Progress and animations
    const [progress, setProgress] = useState(getProgress(habit, currentDateString));
    // const progress = getProgress(habit, currentDateString);
    const alpha = getAlphaValue(habit.total, progress);
    const progressAnimation = useRef(new Animated.Value(alpha)).current;
    const interpolatedSize = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    // Animate circle progress
    useEffect(() => {
        Animated.timing(progressAnimation, {
            toValue: alpha,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start();
    }, [alpha, progressAnimation]);

    // Updating progress from initial habit
    useEffect(() => {
        setProgress(getProgress(habit, currentDateString));
        console.log(currentDateString);
    }, [currentDateString]);

    const updateHabitDebounced = AwesomeDebouncePromise(
        (progress: number) =>
            updateHabit({
                ...habit,
                dates: {
                    ...habit.dates,
                    [currentDateString]: { progressTotal: habit.total, progress: progress },
                },
            }),
        400,
    );

    // // Update habit progress
    useEffect(() => {
        console.log(progress);
        // updateHabitDebounced(progress);
        // updateHabit({
        //     ...habit,
        //     dates: {
        //         ...habit.dates,
        //         [currentDateString]: { progressTotal: habit.total, progress: progress },
        //     },
        // });

        // Disabling exhausting dependencies which causes infinite re-renders when using context values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);

    return (
        <DismissableScrollView navigation={navigation}>
            <ArrowControls
                title={currentDate.format('MMM Do YYYY')}
                colour={gradient.solid}
                onLeftPress={() => setCurrentDateIndex(currentDateIndex - 1)}
                onRightPress={() => setCurrentDateIndex(currentDateIndex + 1)}
            />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CircleContainer height={circleDimensions}>
                    <CircleText>
                        {progress}/{habit.total}
                    </CircleText>
                    <Svg width={circleDimensions} height={circleDimensions} style={{ position: 'absolute' }}>
                        <Circle stroke={gradient.solid + '50'} cx={cXcY} cy={cXcY} r={radius} strokeWidth={20} />
                    </Svg>
                    <Svg
                        width={circleDimensions}
                        height={circleDimensions}
                        style={{
                            position: 'absolute',
                            transform: [{ rotate: '-90deg' }],
                        }}
                    >
                        <AnimatedCircle
                            stroke={gradient.solid}
                            cx={cXcY}
                            cy={cXcY}
                            r={radius}
                            strokeWidth={20}
                            strokeDashoffset={interpolatedSize}
                            strokeDasharray={[circumference, circumference]}
                        />
                    </Svg>
                </CircleContainer>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: 'red', width: 50, height: 50 }}
                onPress={
                    () => {
                        setProgress(progress + 1);
                        updateHabitDebounced(progress + 1);
                        // updateHabit({
                        //     ...habit,
                        //     dates: {
                        //         ...habit.dates,
                        //         [currentDateString]: { progressTotal: habit.total, progress: progress + 1 },
                        //     },
                        // });
                    }
                    // habitDispatch({
                    //     type: 'all',
                    //     payload: { ...DEFAULT_HABIT },
                    // })
                }
            />
            <TouchableOpacity
                disabled={progress <= 0}
                style={{ backgroundColor: 'green', width: 50, height: 50 }}
                onPress={
                    () => {
                        setProgress(progress - 1);
                        updateHabitDebounced(progress + 1);
                        // updateHabit({
                        //     ...habit,
                        //     dates: {
                        //         ...habit.dates,
                        //         [currentDateString]: { progressTotal: habit.total, progress: progress - 1 },
                        //     },
                        // });
                    }
                    // habitDispatch({
                    //     type: 'progress',
                    //     payload: { date: currentDateString, progress: progress - 1 },
                    // })
                }
            />
        </DismissableScrollView>
    );
};

export default ViewScreen;
