import Card from 'Components/Card/Card';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import Icon from 'Components/Icon';
import {
    TrendAverageText,
    TrendAverageTextContainer,
    TrendAverageWeekText,
} from 'Components/TrendButton/TrendButton.styles';
import TrendChart from 'Components/TrendChart/TrendChart';
import { AppContext } from 'Context/AppContext';
import moment from 'moment';
import { IndividualTrendNavProps, IndividualTrendRouteProps } from 'Navigation/Params';
import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
import { getMarkedDates, sortDates, today } from 'Screens/View/Modules/CalendarModule';
import StatsModule from 'Screens/View/Modules/StatsModule';
import { StatsBar } from 'Screens/View/Modules/StatsModule.style';
import { GradientColours } from 'Styles/Colours';
import { getChartStats, trendMessages } from './IndividualTrendScreen.functions';
import {
    TrendButtonCircleLarge,
    TrendGrowthContainer,
    TrendMessage,
    TrendMessageContainer,
    TrendMessageMargin,
    TrendStats,
} from './IndividualTrendScreen.styles';

interface IndividualTrendScreenProps {
    navigation: IndividualTrendNavProps;
    route: IndividualTrendRouteProps;
}

const IndividualTrendScreen: React.FC<IndividualTrendScreenProps> = ({ navigation, route }) => {
    const { habits } = useContext(AppContext);
    const { id, colour, weeklyTotalArray, threeMonthAverage, yearAverage } = route.params;
    const habit = habits[id];
    const gradient = GradientColours[colour];

    const sortedDates = useMemo(() => sortDates(Object.keys(habit.dates)), [habit.dates]);
    const markedDates = useMemo(() => getMarkedDates(habit, today, sortedDates), [habit, sortedDates]);
    const chartStats = useMemo(() => getChartStats(habit), [habit]);

    return (
        <DismissableScrollView navigation={navigation}>
            <TrendGrowthContainer>
                <TrendButtonCircleLarge>
                    <Icon
                        family="entypo"
                        name={
                            weeklyTotalArray.enoughData
                                ? threeMonthAverage > yearAverage
                                    ? 'chevron-up'
                                    : 'chevron-down'
                                : 'minus'
                        }
                        size={50}
                        colour={gradient.solid}
                    />
                </TrendButtonCircleLarge>
                <TrendMessageContainer>
                    <TrendAverageTextContainer>
                        <TrendAverageText colour={gradient.solid}>
                            {weeklyTotalArray.enoughData
                                ? Math.round(threeMonthAverage * 100) / 100
                                : 'Not Enough Data'}
                        </TrendAverageText>
                        {weeklyTotalArray.enoughData && (
                            <TrendAverageWeekText colour={gradient.solid}>/week</TrendAverageWeekText>
                        )}
                    </TrendAverageTextContainer>
                    <TrendMessage>
                        {weeklyTotalArray.enoughData
                            ? threeMonthAverage > yearAverage
                                ? trendMessages.grow
                                : trendMessages.loss
                            : trendMessages.notEnoughData}
                    </TrendMessage>
                </TrendMessageContainer>
            </TrendGrowthContainer>
            <TrendMessage style={TrendMessageMargin}>
                {moment().format('MMM Do YYYY') + ' - ' + moment().format('MMM Do YYYY')}
            </TrendMessage>
            <TrendChart
                colour={gradient.solid}
                weeklyTotalArray={weeklyTotalArray}
                threeMonthAverage={threeMonthAverage}
                yearAverage={yearAverage}
            />

            <Card>
                <StatsBar colour={gradient.solid} />
                <TrendStats colour={gradient.solid}>
                    {chartStats.threeMonthAchieved}/{chartStats.threeMonthTotal} days ({chartStats.threeMonthPercentage}
                    %)
                </TrendStats>
                <TrendStats>
                    {chartStats.yearAchieved}/{chartStats.yearTotal} days ({chartStats.yearPercentage}%)
                </TrendStats>
            </Card>

            <StatsModule habit={habit} colour={gradient.solid} sortedDates={sortedDates} markedDates={markedDates} />
        </DismissableScrollView>
    );
};

export default IndividualTrendScreen;
