import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { AppContext } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/Params';
import React, { useContext, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { GradientColours } from 'Styles/Colours';
import { CalendarButtonGroupContainer } from './CalendarScreen.styles';
import WeekModule from './Modules/WeekModule';

type rangeType = 'Weekly' | 'Monthly' | 'Yearly';
const rangeMap: rangeType[] = ['Weekly', 'Monthly', 'Yearly'];

interface CalendarScreenProps {
    navigation: TabNavProps;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
    const { habits, updateHabit, colour } = useContext(AppContext);

    const [range, setRange] = useState<rangeType>('Weekly');
    const buttonFunctions = useMemo(() => rangeMap.map(range => () => setRange(range)), []);

    const renderRange = (): React.ReactNode => {
        switch (range) {
            case 'Weekly':
                return (
                    <WeekModule
                        navigation={navigation}
                        habits={habits}
                        updateHabit={updateHabit}
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

            {renderRange()}
        </>
    );
};

export default CalendarScreen;