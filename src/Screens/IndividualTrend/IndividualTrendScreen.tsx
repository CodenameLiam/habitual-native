import TrendChart from 'Components/TrendChart/TrendChart';
import { TrendContainer } from 'Components/TrendChart/TrendChart.styles';
import { AppContext } from 'Context/AppContext';
import { IndividualTrendNavProps, IndividualTrendRouteProps } from 'Navigation/Params';
import React, { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMarkedDates, sortDates, today } from 'Screens/View/Modules/CalendarModule';
import StatsModule from 'Screens/View/Modules/StatsModule';
import { GradientColours } from 'Styles/Colours';

interface IndividualTrendScreenProps {
    navigation: IndividualTrendNavProps;
    route: IndividualTrendRouteProps;
}

const IndividualTrendScreen: React.FC<IndividualTrendScreenProps> = ({ navigation, route }) => {
    const { habits } = useContext(AppContext);
    const habit = habits[route.params.id];
    const gradient = useMemo(() => GradientColours[habit.colour], [habit.colour]);

    const sortedDates = useMemo(() => sortDates(Object.keys(habit.dates)), [habit.dates]);
    const markedDates = useMemo(() => getMarkedDates(habit, today, sortedDates), [habit, sortedDates]);

    return (
        <View>
            <TrendChart habit={habit} colour={gradient.solid} />
            <StatsModule habit={habit} colour={gradient.solid} sortedDates={sortedDates} markedDates={markedDates} />
        </View>
    );
};

export default IndividualTrendScreen;
