import Card from 'Components/Card/Card';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import Icon from 'Components/Icon';
import {
    TrendAverageText,
    TrendAverageTextContainer,
    TrendAverageWeekText,
} from 'Components/TrendButton/TrendButton.styles';
import TrendChart from 'Components/TrendChart/TrendChart';
import { AppContext, useHabits } from 'Context/AppContext';
import { getSortedDates } from 'Helpers/Habits';
import ViewStats from 'Modules/ViewModules/ViewStats/ViewStats';
import { StatsBar } from 'Modules/ViewModules/ViewStats/ViewStats.styles';
import moment from 'moment';
import { StatsNavProps, StatsRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
// import { IndividualTrendNavProps, IndividualTrendRouteProps } from 'Navigation/Params';
import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
// import { getMarkedDates, sortDates, today } from 'Screens/View/Modules/CalendarModule';
// import StatsModule from 'Screens/View/Modules/StatsModule';
// import { StatsBar } from 'Screens/View/Modules/StatsModule.style';
import { Gradients } from 'Styles/Colours';
import { Colour } from 'Types/Colour.types';
import { getChartStats, getChartString, trendMessages } from './StatsScreen.functions';
import {
    TrendButtonCircleLarge,
    TrendGrowthContainer,
    TrendMessage,
    TrendMessageContainer,
    TrendMessageMargin,
    TrendStats,
} from './StatsScreen.styles';

interface StatsScreenProps {
    navigation: StatsNavProps;
    route: StatsRouteProps;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ navigation, route }) => {
    // Route params
    const { id, colour, weeklyTotalArray, threeMonthAverage, yearAverage } = route.params;

    // Habit
    const [habits] = useHabits();
    const habit = habits[id];

    // Memoized values
    const gradient = useMemo(() => Gradients[colour as Colour], [colour]);
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
                                ? getChartString(threeMonthAverage, habit.type)
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
                type={habit.type}
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
            <ViewStats colour={gradient.solid} habit={habit} />
        </DismissableScrollView>
    );
};

export default StatsScreen;
