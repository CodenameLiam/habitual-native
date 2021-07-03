import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { useColour, useHabits } from 'Context/AppContext';
import { getSortedHabits } from 'Helpers/Habits';
import CalendarMonth from 'Modules/CalendarModules/CalendarMonth/CalendarMonth';
import CalendarWeek from 'Modules/CalendarModules/CalendarWeek/CalendarWeek';
import CalendarYear from 'Modules/CalendarModules/CalendarYear/CalendarYear';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Fragment, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { Full } from 'Styles/Globals';
import { CalendarButtonGroupContainer } from './CalendarScreen.styles';

type rangeType = 'Weekly' | 'Monthly' | 'Yearly';
const rangeMap: rangeType[] = ['Weekly', 'Monthly', 'Yearly'];

interface CalendarScreenProps {
    navigation: TabNavProps;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
    const [habits, dispatchHabits] = useHabits();
    const [colour] = useColour();
    const gradient = useMemo(() => Gradients[colour], [colour]);
    const sortedHabits = useMemo(() => getSortedHabits(habits), [habits]);

    const [range, setRange] = useState<rangeType>('Weekly');
    const buttonFunctions = useMemo(() => rangeMap.map(range => () => setRange(range)), []);

    return (
        <Fragment>
            <CalendarButtonGroupContainer>
                <ColourButtonGroup
                    buttons={['Weekly', 'Monthly', 'Yearly']}
                    buttonFunctions={buttonFunctions}
                    colour={gradient.solid}
                    activeTitle={range}
                />
            </CalendarButtonGroupContainer>

            <View style={Full}>
                {
                    {
                        Weekly: (
                            <CalendarWeek
                                habits={sortedHabits}
                                dispatchHabits={dispatchHabits}
                                colour={gradient.solid}
                                navigation={navigation}
                            />
                        ),
                        Monthly: (
                            <CalendarMonth habits={sortedHabits} navigation={navigation} colour={gradient.solid} />
                        ),
                        Yearly: <CalendarYear habits={sortedHabits} navigation={navigation} colour={gradient.solid} />,
                    }[range]
                }
            </View>
        </Fragment>
    );
};

export default CalendarScreen;
