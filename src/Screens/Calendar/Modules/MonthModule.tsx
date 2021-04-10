import ArrowControls from 'Components/ArrowControls/ArrowControls';
import { IAllHabits, IHabit } from 'Controllers/HabitController/HabitController';
import { useTheme } from 'Controllers/ThemeController';
import moment from 'moment';
import { TabNavProps } from 'Navigation/Params';
import React from 'react';
import { View, Text } from 'react-native';

interface MonthModuleProps {
    monthIndex: number;
    setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
    habits: IAllHabits;
    colour: string;
    navigation: TabNavProps;
    updateHabit: (habit: IHabit) => Promise<void>;
}

const MonthModule: React.FC<MonthModuleProps> = ({
    monthIndex,
    setMonthIndex,
    navigation,
    habits,
    colour,
    updateHabit,
}) => {
    const theme = useTheme();
    const month = moment().add(monthIndex, 'month');

    return (
        <View style={{ flex: 1 }}>
            <ArrowControls
                colour={colour}
                title={`${month.format('MMMM, YYYY')}`}
                onLeftPress={() => setMonthIndex(monthIndex - 1)}
                onRightPress={() => setMonthIndex(monthIndex + 1)}
                onTitlePress={() => setMonthIndex(0)}
                rightDisabled={monthIndex === 0}
            />
        </View>
    );
};

export default MonthModule;
