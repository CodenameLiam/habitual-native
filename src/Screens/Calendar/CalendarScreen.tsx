import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { AppContext } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/Params';
import React, { useContext, useMemo, useState } from 'react';
import { View } from 'react-native';
import { GradientColours } from 'Styles/Colours';
import { CalendarButtonGroupContainer } from './CalendarScreen.styles';
import MonthModule from './Modules/MonthModule';
import WeekModule from './Modules/WeekModule';
import YearModule from './Modules/YearModule';

type rangeType = 'Weekly' | 'Monthly' | 'Yearly';
const rangeMap: rangeType[] = ['Weekly', 'Monthly', 'Yearly'];

interface CalendarScreenProps {
    navigation: TabNavProps;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
    const { habits, updateHabit, colour } = useContext(AppContext);

    const [weekIndex, setWeekIndex] = useState<number>(0);
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const [yearIndex, setYearIndex] = useState<number>(0);

    const [range, setRange] = useState<rangeType>('Weekly');
    const buttonFunctions = useMemo(() => rangeMap.map(range => () => setRange(range)), []);

    const renderRange = (): React.ReactNode => {
        switch (range) {
            case 'Weekly':
                return (
                    <WeekModule
                        weekIndex={weekIndex}
                        setWeekIndex={setWeekIndex}
                        navigation={navigation}
                        habits={habits}
                        updateHabit={updateHabit}
                        colour={GradientColours[colour].solid}
                    />
                );
            case 'Monthly':
                return (
                    <MonthModule
                        monthIndex={monthIndex}
                        setMonthIndex={setMonthIndex}
                        navigation={navigation}
                        habits={habits}
                        colour={GradientColours[colour].solid}
                    />
                );
            case 'Yearly':
                return (
                    <YearModule
                        yearIndex={yearIndex}
                        setYearIndex={setYearIndex}
                        navigation={navigation}
                        habits={habits}
                        colour={GradientColours[colour].solid}
                    />
                );
            default:
                return undefined;
        }
    };

    return (
        <>
            <CalendarButtonGroupContainer>
                <ColourButtonGroup
                    buttons={['Weekly', 'Monthly', 'Yearly']}
                    buttonFunctions={buttonFunctions}
                    colour={GradientColours[colour].solid}
                    activeTitle={range}
                />
            </CalendarButtonGroupContainer>

            <View style={{ flex: 1 }}>{renderRange()}</View>
        </>
    );
};

export default CalendarScreen;
