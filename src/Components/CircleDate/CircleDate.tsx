import { useTheme } from '@emotion/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Dimensions, Animated, Easing } from 'react-native';
import { color } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { GradientColours, IColours } from 'Styles/Colours';
import { Absolute } from 'Styles/Globals';
import { CircleButton, DayNumber, DayText } from './CircleDate.styles';

const circleDimensions = Dimensions.get('screen').width / 9;
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleDateProps {
    alpha: number;
    colour: IColours;
    dayText: string;
    dayNumber: string;
    handlePress: () => void;
    selected: boolean;
    disabled?: boolean;
}

const CircleDate: React.FC<CircleDateProps> = ({
    alpha,
    dayNumber,
    dayText,
    selected,
    disabled,
    handlePress,
    colour,
}) => {
    const theme = useTheme();
    const circleColour = useMemo(() => (disabled ? theme.grey : GradientColours[colour].solid), [
        theme.grey,
        disabled,
        colour,
    ]);

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
        <CircleButton circleDimensions={circleDimensions}>
            <DayNumber selected={selected}>{dayNumber}</DayNumber>
            <DayText selected={selected}>{dayText}</DayText>
            <View style={Absolute}>
                <Svg width={circleDimensions} height={circleDimensions}>
                    <Circle stroke={circleColour + '50'} cx={cXcY} cy={cXcY} r={radius} strokeWidth={3} />
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
                        stroke={circleColour}
                        cx={cXcY}
                        cy={cXcY}
                        r={radius}
                        strokeWidth={3}
                        strokeDashoffset={interpolatedSize}
                        strokeDasharray={[circumference, circumference]}
                    />
                </Svg>
            </View>
        </CircleButton>
    );
};

export default CircleDate;
