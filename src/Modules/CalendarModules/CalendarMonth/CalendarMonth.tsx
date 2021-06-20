import ArrowControls from 'Components/ArrowControls/ArrowControls';
import moment from 'moment';
import React, { FC, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Full } from 'Styles/Globals';
import { Habits } from 'Types/Habit.types';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import { getDateArray } from 'Helpers/Dates';
import { AllMonthContainer } from './CalendarMonth.styles';
import MemoizedCalendarMonthHabit from './CalendarMonthHabit';

interface CalendarMonthProps {
    habits: Habits;
    colour: string;
    navigation: TabNavProps;
}

const CalendarMonth: FC<CalendarMonthProps> = ({ navigation, habits, colour }) => {
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const month = useMemo(() => moment().add(monthIndex, 'month'), [monthIndex]);
    const dates = useMemo(() => getDateArray(month.clone().startOf('month'), month.clone().endOf('month')), [month]);

    return (
        <View style={Full}>
            <ArrowControls
                colour={colour}
                title={`${month.format('MMMM, YYYY')}`}
                onLeftPress={() => setMonthIndex(monthIndex - 1)}
                onRightPress={() => setMonthIndex(monthIndex + 1)}
                onTitlePress={() => setMonthIndex(0)}
                rightDisabled={monthIndex === 0}
            />

            <GrowScrollView>
                <AllMonthContainer>
                    {Object.values(habits).map(habit => (
                        <MemoizedCalendarMonthHabit
                            key={habit.id}
                            habit={habit}
                            dates={dates}
                            navigation={navigation}
                        />
                    ))}
                </AllMonthContainer>
            </GrowScrollView>
        </View>
    );
};

export default CalendarMonth;
