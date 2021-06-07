import { Moment } from 'moment';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Gradients } from 'Styles/Colours';
import { Absolute } from 'Styles/Globals';
import { Colour } from 'Types/Colour.types';
import { CircleActiveDot, CircleButton, DayNumber, DayText } from './CircleDate.styles';

const circleDimensions = Dimensions.get('screen').width / 9;
const cXcY = circleDimensions / 2;
const radius = circleDimensions / 2 - 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleDateProps {
    active: boolean;
    alpha: number;
    colour: Colour;
    date: Moment;
    handlePress: () => void;
}

const CircleDate: FC<CircleDateProps> = ({ active, alpha, colour, date, handlePress }) => {
    const circleColour = useMemo(() => Gradients[colour].solid, [colour]);

    const progressAnimation = useRef(new Animated.Value(alpha)).current;
    const interpolatedSize = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
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
        <CircleButton circleDimensions={circleDimensions} onPress={handlePress}>
            {active && <CircleActiveDot colour={circleColour} />}

            <DayNumber active={active}>{date.format('D')}</DayNumber>
            <DayText active={active}>{date.format('ddd').toUpperCase()}</DayText>
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

const MemoizedCircleDate = React.memo(
    CircleDate,
    (prev, next) => prev.alpha === next.alpha && prev.active === next.active,
);
export default MemoizedCircleDate;
