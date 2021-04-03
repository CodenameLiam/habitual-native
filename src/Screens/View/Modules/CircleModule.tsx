import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { CircleContainer, CircleText } from './CircleModule.styles';

// Constants
const circleDimensions = Dimensions.get('screen').width - 60;
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 15;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getAlphaValue = (total: number, progress: number): number => {
    if (progress >= total) return 0;
    else return progress === 0 ? 1 : 1 - progress / total;
};

interface CircleModuleProps {
    progress: number;
    total: number;
    colour: string;
}

const CircleModule: React.FC<CircleModuleProps> = ({ progress, total, colour }) => {
    // Offset and animation values
    const alpha = getAlphaValue(total, progress);
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

    return (
        <CircleContainer height={circleDimensions}>
            <CircleText>
                {progress}/{total}
            </CircleText>
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
                    strokeDasharray={[circumference, circumference]}
                />
            </Svg>
        </CircleContainer>
    );
};

export default CircleModule;
