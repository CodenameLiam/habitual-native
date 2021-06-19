import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { AppContext, useColour, useHabits } from 'Context/AppContext';
import CalendarMonth from 'Modules/CalendarModules/CalendarMonth/CalendarMonth';
import CalendarWeek from 'Modules/CalendarModules/CalendarWeek/CalendarWeek';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { Fragment, useContext, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { Full } from 'Styles/Globals';
import { CalendarButtonGroupContainer } from './CalendarScreen.styles';
// import MonthModule from './Modules/MonthModule';
// import WeekModule from './Modules/WeekModule';
import YearModule from './Modules/YearModule';

type rangeType = 'Weekly' | 'Monthly' | 'Yearly';
const rangeMap: rangeType[] = ['Weekly', 'Monthly', 'Yearly'];

interface CalendarScreenProps {
    navigation: TabNavProps;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
    const [habits, dispatchHabits] = useHabits();
    const [colour] = useColour();
    const gradient = useMemo(() => Gradients[colour], [colour]);

    const [yearIndex, setYearIndex] = useState<number>(0);

    const [range, setRange] = useState<rangeType>('Weekly');
    const buttonFunctions = useMemo(() => rangeMap.map(range => () => setRange(range)), []);

    // console.log('Calendar');

    // const renderRange = (): React.ReactNode => {
    //     switch (range) {
    //         case 'Weekly':
    //             return (
    //                 <WeekModule
    //                     weekIndex={weekIndex}
    //                     setWeekIndex={setWeekIndex}
    //                     navigation={navigation}
    //                     habits={habits}
    //                     updateHabit={updateHabit}
    //                     colour={Gradients[colour].solid}
    //                 />
    //             );
    //         case 'Monthly':
    //             return (
    //                 <MonthModule
    //                     monthIndex={monthIndex}
    //                     setMonthIndex={setMonthIndex}
    //                     navigation={navigation}
    //                     habits={habits}
    //                     colour={Gradients[colour].solid}
    //                 />
    //             );
    //         case 'Yearly':
    //             return (
    //                 <YearModule
    //                     yearIndex={yearIndex}
    //                     setYearIndex={setYearIndex}
    //                     navigation={navigation}
    //                     habits={habits}
    //                     colour={Gradients[colour].solid}
    //                 />
    //             );
    //         default:
    //             return undefined;
    //     }
    // };

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
                        Yearly: <Text>Year</Text>,
                    }[range]
                }
            </View>
        </Fragment>
    );
};

export default CalendarScreen;
