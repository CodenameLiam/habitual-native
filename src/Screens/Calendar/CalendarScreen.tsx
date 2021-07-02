import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import EmptyPrompt from 'Components/EmptyPrompt/EmptyPrompt';
import { AppContext, useColour, useHabits } from 'Context/AppContext';
import CalendarMonth from 'Modules/CalendarModules/CalendarMonth/CalendarMonth';
import CalendarWeek from 'Modules/CalendarModules/CalendarWeek/CalendarWeek';
import CalendarYear from 'Modules/CalendarModules/CalendarYear/CalendarYear';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Fragment, useContext, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
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
                                habits={habits}
                                dispatchHabits={dispatchHabits}
                                colour={gradient.solid}
                                navigation={navigation}
                            />
                        ),
                        Monthly: <CalendarMonth habits={habits} navigation={navigation} colour={gradient.solid} />,
                        Yearly: <CalendarYear habits={habits} navigation={navigation} colour={gradient.solid} />,
                    }[range]
                }
            </View>
        </Fragment>
    );
};

export default CalendarScreen;
