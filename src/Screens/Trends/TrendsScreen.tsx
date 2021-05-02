import TrendButton from 'Components/TrendButton/TrendButton';
import { AppContext } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/Params';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { AllTrendContainer } from './TrendsScreen.styles';

interface TrendScreenProps {
    navigation: TabNavProps;
}

const TrendsScreen: React.FC<TrendScreenProps> = ({ navigation }) => {
    const { habits } = useContext(AppContext);
    return (
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <AllTrendContainer>
                {Object.values(habits).map(habit => (
                    <TrendButton key={habit.id} navigation={navigation} habit={habit} />
                ))}
            </AllTrendContainer>
        </ScrollView>
    );
};

export default TrendsScreen;
