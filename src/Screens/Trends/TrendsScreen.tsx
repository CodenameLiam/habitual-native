import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedTrendButton from 'Components/TrendButton/TrendButton';
import { AppContext, useHabits } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { AllTrendContainer } from './TrendsScreen.styles';

interface TrendScreenProps {
    navigation: TabNavProps;
}

const TrendsScreen: React.FC<TrendScreenProps> = ({ navigation }) => {
    const [habits] = useHabits();

    return (
        <GrowScrollView>
            <AllTrendContainer>
                {Object.values(habits).map(habit => (
                    <MemoizedTrendButton key={habit.id} navigation={navigation} habit={habit} />
                ))}
            </AllTrendContainer>
        </GrowScrollView>
    );
};

export default TrendsScreen;
