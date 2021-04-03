import ArrowControls from 'Components/ArrowControls/ArrowControls';
import moment from 'moment';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

interface WeekModulesProps {
    colour: string;
}

const WeekModule: React.FC<WeekModulesProps> = ({ colour }) => {
    const [weekIndex, setWeekIndex] = useState<number>(0);

    const weekStart = moment().subtract(weekIndex, 'w').startOf('w').add(1, 'd');
    const weekEnd = moment()
        .subtract(weekIndex - 1, 'w')
        .startOf('w');

    return (
        <View>
            <ArrowControls
                colour={colour}
                title={`${weekStart.format('MMM Do')} - ${weekEnd.format('MMM Do, YYYY')}`}
                onLeftPress={() => setWeekIndex(weekIndex - 1)}
                onRightPress={() => setWeekIndex(weekIndex + 1)}
                rightDisabled={weekIndex === 0}
            />
            <Text></Text>
        </View>
    );
};

export default WeekModule;
