import { useTheme } from '@emotion/react';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import { AppContext } from 'Context/AppContext';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { habitReducer } from 'Controllers/HabitController/HabitReducer';
import moment, { Moment } from 'moment';
import { ViewNavProps, ViewRouteProps } from 'Navigation/Params';
import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { View, Text, InteractionManager, Dimensions, Animated, Easing } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { concat } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle } from 'react-native-svg';
import { GradientColours } from 'Styles/Colours';
import { CircleContainer, CircleText, ViewScreenTitle } from './ViewScreen.styles';

// const slides: number[] = [0, 1, 2];

const circleDimensions = Dimensions.get('screen').width - 90;
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 15;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getMoveDirection = (newSlideIndex: number, oldSlideIndex: number): number => {
    switch (newSlideIndex) {
        case 0:
            return oldSlideIndex === 4 ? 1 : -1;
        case 4:
            return oldSlideIndex === 0 ? -1 : 1;
        default:
            return newSlideIndex > oldSlideIndex ? 1 : -1;
    }
};

const getNextDateIndex = (slideIndex: number, tempSlideIndex: number, nextDateIndex: number): number => {
    switch (slideIndex) {
        case 0:
            return tempSlideIndex === 5 ? nextDateIndex + 1 : nextDateIndex - 1;
        case 1:
            return tempSlideIndex < slideIndex ? nextDateIndex + 1 : nextDateIndex - 1;
        case 2:
            return tempSlideIndex === 1 ? nextDateIndex + 1 : nextDateIndex - 1;
        default:
            return nextDateIndex;
    }
};

const getAlphaValue = (habit: IHabit, selectedDate: string): number => {
    if (habit.dates[selectedDate]) {
        return habit.dates[selectedDate].progress === 0 ? 1 : 1 - habit.dates[selectedDate].progress / habit.total;
    } else {
        return 1;
    }
};

const getProgress = (habit: IHabit, selectedDate: string): number => {
    return habit.dates[selectedDate] ? habit.dates[selectedDate].progress : 0;
};

interface ISlide {
    progress: number;
    alpha: number;
    date: string;
}

const getSlides = (habit: IHabit, slideIndex: number): ISlide[] => {
    let dateArray = [slideIndex, slideIndex + 1, slideIndex + 2, slideIndex - 2, slideIndex - 1];

    const modLength = dateArray.length;
    const modIndex = slideIndex >= 0 ? slideIndex % modLength : modLength - Math.abs(slideIndex % modLength);

    dateArray = dateArray.splice(modLength - modIndex, modLength).concat(dateArray.splice(0, modLength - modIndex));

    const slideArray: ISlide[] = dateArray.map(value => {
        return {
            progress: getProgress(habit, moment().add(value, 'd').format('YYYY-MM-DD')),
            alpha: getAlphaValue(habit, moment().add(value, 'd').format('YYYY-MM-DD')),
            date: moment().add(value, 'd').format('YYYY-MM-DD'),
        };
    });

    return slideArray;
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
    const [habit, habitDispatch] = useReducer(habitReducer, habits[id]);
    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    // Dates and slides
    const [currentDateIndex, setCurrentDateIndex] = useState(-prevIndex);
    const currentDate = moment().add(currentDateIndex, 'd');

    const [slidePointerIndex, setSlidePointerIndex] = useState(0);
    const [slides, setSlides] = useState(getSlides(habit, currentDateIndex));

    // console.log(currentDateIndex);

    // Update the slide information
    useEffect(() => {
        if (mountRef.current) {
            setSlides(getSlides(habit, currentDateIndex));
        } else {
            mountRef.current = true;
        }
    }, [habit, currentDateIndex]);

    // Progress and animations
    const progress = getProgress(habit, currentDate.format('YYYY-MM-DD'));
    const trueAlpha = getAlphaValue(habit, currentDate.format('YYYY-MM-DD'));
    const progressAnimation = useRef(new Animated.Value(trueAlpha)).current;
    const interpolatedSize = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    // Animate circle progress
    useEffect(() => {
        Animated.timing(progressAnimation, {
            toValue: trueAlpha,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start();
    }, [trueAlpha, progressAnimation]);

    // console.log(trueAlpha);

    // Updates the header to reflect the current gradient
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: habit.name,
        });
        // mountRef.current = true;
    }, [navigation, habit.colour, habit.name]);

    // Ready state
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsReady(true);
        });
    }, []);

    // Carousel Swipe Handler
    const handleSwipe = (slideIndex: number): void => {
        // const moveDirection =
        // setSlides(getSlides(habit, currentDateIndex + getMoveDirection(slideIndex, slidePointerIndex)));
        // setSlides(getSlides(habit, currentDateIndex + moveDirection));
        setCurrentDateIndex(currentDateIndex + getMoveDirection(slideIndex, slidePointerIndex));

        // console.log(d);
        // console.log(getMoveDirection(slideIndex, tempSlideIndex));
        // setNextDateIndex(getNextDateIndex(slideIndex, tempSlideIndex, nextDateIndex));
        setSlidePointerIndex(slideIndex);
    };

    const renderItem = (progress: number, alpha: number, index: number): any => {
        const interpolatedAlpha = alpha * circumference;
        return (
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
                        strokeDashoffset={index === slidePointerIndex ? interpolatedSize : interpolatedAlpha}
                        // strokeDashoffset={interpolatedAlpha}
                        strokeDasharray={[circumference, circumference]}
                    />
                </Svg>
            </CircleContainer>
        );
    };

    return (
        <DismissableScrollView navigation={navigation}>
            <ViewScreenTitle>{currentDate.format('MMM Do YYYY')}</ViewScreenTitle>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Carousel
                    // key={slidePointerIndex}
                    loop
                    layout="default"
                    data={slides}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={circleDimensions}
                    itemHeight={circleDimensions}
                    renderItem={({ item, index }: any) => renderItem(item.progress, item.alpha, index)}
                    onSnapToItem={index => handleSwipe(index)}
                />
            </View>
            <TouchableOpacity
                style={{ backgroundColor: 'red', width: 50, height: 50 }}
                onPress={() =>
                    habitDispatch({
                        type: 'progress',
                        payload: { date: currentDate.format('YYYY-MM-DD'), progress: progress + 1 },
                    })
                }
            />
        </DismissableScrollView>
    );
};

export default ViewScreen;
