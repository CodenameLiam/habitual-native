import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { AppContext } from 'Context/AppContext';
import React, { useContext, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { GradientColours } from 'Styles/Colours';
import { CalendarButtonGroupContainer, CalendarContainer } from './CalendarScreen.styles';
import WeekModule from './Modules/WeekModule';

type rangeType = 'Weekly' | 'Monthly' | 'Yearly';
const rangeMap: rangeType[] = ['Weekly', 'Monthly', 'Yearly'];

const CalendarScreen: React.FC = () => {
    const { habits, updateHabit, colour } = useContext(AppContext);

    const [range, setRange] = useState<rangeType>('Weekly');
    const buttonFunctions = useMemo(() => rangeMap.map(range => () => setRange(range)), []);

    const renderRange = (): React.ReactNode => {
        switch (range) {
            case 'Weekly':
                return <WeekModule colour={GradientColours[colour].solid} />;
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
