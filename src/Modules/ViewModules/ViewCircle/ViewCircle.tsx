import { getAlpha, getTime } from 'Helpers/Habits';
import React, { FC, MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Svg, { Circle } from 'react-native-svg';
import { HabitType } from 'Types/Habit.types';
import { CircleContainer, CircleText } from './ViewCircle.styles';

// Constants
const circleDimensions = Math.min(widthPercentageToDP(90), 500);
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 15;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ViewCircleProps {
    colour: string;
    progress: number;
    total: number;
    type: HabitType;
    playingRef: MutableRefObject<boolean>;
}

const ViewCircle: FC<ViewCircleProps> = ({ colour, progress, total, type, playingRef }) => {
    // Offset and animation values
    const alpha = useMemo(() => getAlpha(progress, total), [progress, total]);
    const progressAnimation = useRef(new Animated.Value(alpha)).current;
    const interpolatedSize = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    // Animate circle progress
    useEffect(() => {
        Animated.timing(progressAnimation, {
            toValue: alpha,
            duration: playingRef.current ? 1300 : 500,
            useNativeDriver: true,
            easing: playingRef.current ? Easing.linear : Easing.out(Easing.quad),
        }).start();
    }, [alpha, playingRef, progressAnimation]);

    return (
        <CircleContainer height={circleDimensions}>
            <CircleText>{type === 'count' ? `${progress}/${total}` : getTime(progress).formatTime}</CircleText>
            <Svg width={circleDimensions} height={circleDimensions} style={{ position: 'absolute' }}>
                <Circle stroke={colour + '50'} cx={cXcY} cy={cXcY} r={radius} strokeWidth={20} />
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
                    stroke={colour}
                    cx={cXcY}
                    cy={cXcY}
                    r={radius}
                    strokeWidth={20}
                    strokeDashoffset={interpolatedSize}
                    strokeLinecap="round"
                    strokeDasharray={[circumference, circumference]}
                />
            </Svg>
        </CircleContainer>
    );
};

export default ViewCircle;
