import { useTheme } from '@emotion/react';
import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { useColour } from 'Context/AppContext';
import { getDateArray } from 'Helpers/Dates';
import moment from 'moment';
import React, { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { ClipPath, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { YAxis, XAxis, AreaChart } from 'react-native-svg-charts';
import { CalendarButtonGroupContainer } from 'Screens/Calendar/CalendarScreen.styles';
import { Gradient, Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';
import { Habits } from 'Types/Habit.types';
import { activeMonthRange, ActiveMonthType } from './TrendGraph.constants';
import { getTrendData, getTrendLabel } from './TrendGraph.functions';
import * as shape from 'd3-shape';
import { useDebouncedCallback } from 'use-debounce/lib';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { Dimensions, Platform, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const contentInset = { top: 20, bottom: 20, left: 5, right: 5 };

interface GraphGradientProps {
    gradient: Gradient;
    theme?: string;
}

const GraphBackgroundGradient: FC<GraphGradientProps> = ({ gradient, theme }) => (
    <Defs key={'background-gradient'}>
        <LinearGradient id={'background-gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={gradient.solid} stopOpacity={0.8} />
            <Stop offset={'100%'} stopColor={theme} stopOpacity={0.2} />
        </LinearGradient>
    </Defs>
);

const GraphLineGradient: FC<GraphGradientProps> = ({ gradient }) => (
    <Defs key={'line-gradient'}>
        <LinearGradient id={'line-gradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
            <Stop offset={'0%'} stopColor={gradient.end} />
            <Stop offset={'100%'} stopColor={gradient.start} />
        </LinearGradient>
    </Defs>
);

interface GraphClipProps {
    graphAnimation: Animated.SharedValue<number>;
    monthRange: ActiveMonthType;
}

const GraphClips: FC<GraphClipProps> = ({ graphAnimation }) => {
    // console.log(graphAnimation.value);

    const widthAnimation = useAnimatedProps(() => ({
        width: graphAnimation.value,
    }));

    return (
        <Defs key={'clips'}>
            <ClipPath id="clip-path-1">
                <AnimatedRect animatedProps={widthAnimation} x={'0'} y={'0'} height={'100%'} />
            </ClipPath>
        </Defs>
    );
};

const Line: FC<any> = ({ line }) => (
    <Path
        key={'line'}
        d={line}
        strokeWidth={3}
        strokeLinecap="round"
        stroke={'url(#line-gradient)'}
        fill={'none'}
        clipPath="url(#clip-path-1)"
    />
);

interface TrendGraphProps {
    habits: Habits;
}

const TrendGraph: FC<TrendGraphProps> = ({ habits }) => {
    const theme = useTheme();
    const [colour] = useColour();
    const gradient = useMemo(() => Gradients[colour], [colour]);

    // Debounce progress to improve perceived performance
    const [trendHabits, setTrendHabits] = useState(habits);
    const updateStatHabit = useDebouncedCallback((habits: Habits) => setTrendHabits(habits), 500);
    useEffect(() => {
        updateStatHabit(habits);
    }, [habits, updateStatHabit]);

    const [monthRange, setMonthRange] = useState<ActiveMonthType>(1);
    const dates = useMemo(() => getDateArray(moment().subtract(monthRange, 'month'), moment()), [monthRange]);
    const data = useMemo(() => getTrendData(trendHabits, dates, monthRange), [dates, trendHabits, monthRange]);

    // Animation value
    const graphAnimation = useSharedValue(0);

    // Animation event
    const animateGraph = useCallback(() => {
        if (Platform.OS === 'ios') {
            graphAnimation.value = 0;
            graphAnimation.value = withTiming(Dimensions.get('screen').width - widthPercentageToDP(10), {
                duration: 2000,
                easing: Easing.inOut(Easing.quad),
            });
        } else {
            graphAnimation.value = Dimensions.get('screen').width;
        }
    }, [graphAnimation]);

    // Animate on mount
    useEffect(() => {
        animateGraph();
    }, [animateGraph]);

    // Month range button functions
    const buttonFunctions = useMemo(
        () =>
            [1, 3, 12].map(value => () => {
                setMonthRange(value as ActiveMonthType);
                animateGraph();
            }),
        [animateGraph],
    );

    return (
        <Fragment>
            <CalendarButtonGroupContainer>
                <ColourButtonGroup
                    buttons={['1 Month', '3 Months', '1 Year']}
                    buttonFunctions={buttonFunctions}
                    colour={gradient.solid}
                    activeTitle={activeMonthRange[monthRange]}
                />
            </CalendarButtonGroupContainer>

            <View style={{ height: heightPercentageToDP(20), flexDirection: 'row', marginLeft: 15, marginRight: 15 }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: theme.grey,
                        fontSize: heightPercentageToDP(1.2),
                        fontFamily: fontFamily,
                        fontWeight: '600',
                    }}
                    numberOfTicks={6}
                    min={0}
                    formatLabel={value => `  ${value}  `}
                />
                <AreaChart
                    style={{ flex: 1, marginLeft: 5 }}
                    data={data}
                    contentInset={contentInset}
                    curve={shape.curveBasis}
                    svg={{
                        strokeLinecap: 'round',
                        clipPath: 'url(#clip-path-1)',
                        fill: 'url(#background-gradient)',
                    }}
                    gridMin={0}
                >
                    <GraphBackgroundGradient gradient={gradient} theme={theme.background} />
                    <GraphLineGradient gradient={gradient} />
                    <GraphClips graphAnimation={graphAnimation} monthRange={monthRange} />
                    <Line />
                </AreaChart>
            </View>
            <XAxis
                data={data}
                formatLabel={(value, index) => getTrendLabel(index, monthRange)}
                contentInset={{ left: 50, right: 40 }}
                svg={{
                    fill: theme.grey,
                    fontSize: heightPercentageToDP(1.2),
                    fontFamily: fontFamily,
                    fontWeight: '600',
                }}
            />
        </Fragment>
    );
};

export default TrendGraph;
