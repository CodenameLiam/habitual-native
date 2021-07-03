import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import MemoizedTrendButton from 'Components/TrendButton/TrendButton';
import { useHabits } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Fragment, useMemo } from 'react';
import { AllTrendContainer } from './TrendsScreen.styles';
import TrendGraph from 'Modules/TrendModules/TrendGraph';
import { getSortedHabits } from 'Helpers/Habits';

interface TrendScreenProps {
    navigation: TabNavProps;
}

const TrendsScreen: React.FC<TrendScreenProps> = ({ navigation }) => {
    const [habits] = useHabits();
    const sortedHabits = useMemo(() => getSortedHabits(habits), [habits]);

    return (
        <Fragment>
            <TrendGraph habits={habits} />
            <GrowScrollView>
                <AllTrendContainer>
                    {sortedHabits.map(habit => (
                        <MemoizedTrendButton key={habit.id} navigation={navigation} habit={habit} />
                    ))}
                </AllTrendContainer>
            </GrowScrollView>
        </Fragment>
    );
};

export default TrendsScreen;
