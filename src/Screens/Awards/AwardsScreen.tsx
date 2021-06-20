import { useTheme } from '@emotion/react';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import { HabitScroll } from 'Components/Habit/Habit.styles';
import Habitual from 'Components/Habitual/Habitual';
import Icon from 'Components/Icon';
import { AppContext, useHabits } from 'Context/AppContext';
import { getDateArray, weekArray } from 'Helpers/Dates';
import { isPerfectWeek } from 'Helpers/Habits';
// import { IAllHabits } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { FC, useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
// import { View, Text, ScrollView } from 'react-native';
// import { sortDates } from 'Screens/View/Modules/CalendarModule';

// const getPerfectMonths = (habits: IAllHabits): void => {
//     const perfectMonths = [];
//     Object.values(habits).forEach(habit => {
//         const sortedDates = sortDates(Object.keys(habit.dates));
//         console.log(sortedDates);
//     });
// };

interface AwardStarsProps {
    colour: string;
}

const AwardStars: FC<AwardStarsProps> = ({ colour }) => {
    const theme = useTheme();

    return (
        <View style={{ position: 'relative', width: 40, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Icon
                style={{ position: 'absolute', bottom: -5, left: 20 }}
                family="material"
                name="star"
                size={30}
                colour={colour}
            />
            <Icon
                style={{ position: 'absolute', bottom: 2.5, left: 27.5 }}
                family="material"
                name="star"
                size={15}
                colour={theme.background}
            />
            <Icon
                style={{ position: 'absolute', bottom: -5, right: 20 }}
                family="material"
                name="star"
                size={30}
                colour={colour}
            />
            <Icon
                style={{ position: 'absolute', bottom: 2.5, right: 27.5 }}
                family="material"
                name="star"
                size={15}
                colour={theme.background}
            /> */}
            {/* front */}
            <Icon
                style={{ position: 'absolute', bottom: -5 }}
                family="material"
                name="star"
                size={40}
                colour={colour}
            />
            <Icon
                style={{ position: 'absolute', bottom: 5 }}
                family="material"
                name="star"
                size={20}
                colour={theme.background}
            />
        </View>
    );
};

const AwardsScreen: React.FC = () => {
    // console.log(moment().format('YYYY-MM'));

    console.log(moment('2021-06'));

    const [habits] = useHabits();

    const dates = useMemo(() => getDateArray(moment().startOf('isoWeek'), moment().endOf('isoWeek')), []);

    // console.log(dates);

    Object.values(habits).forEach(habit => {
        const yoooo = isPerfectWeek(habit, dates);
    });

    // console.log(habits);
    // const { habits } = useContext(AppContext);
    // getPerfectMonths(habits);

    const theme = useTheme();

    return (
        <GrowScrollView>
            <View
                // key={habit.id}
                style={{
                    position: 'relative',
                    height: 100,
                    width: 100,
                    // borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: Gradients.PURPLE.solid,
                    // overflow: 'hidden',
                }}
            >
                <Icon
                    style={{ position: 'absolute' }}
                    family="materialcommunity"
                    name="hexagon"
                    size={100}
                    colour={Gradients.PURPLE.solid}
                />
                <Icon
                    style={{ position: 'absolute' }}
                    family="materialcommunity"
                    name="hexagon"
                    size={85}
                    colour={theme.background}
                />
                {/* <View style={{ position: 'absolute', bottom: 0 }}>
                    <AwardStars colour={Gradients.PURPLE.solid} />
                </View> */}
                {/* <View
                    // key={habit.id}
                    style={{
                        position: 'absolute',
                        height: 60,
                        width: 60,
                        borderRadius: 70,

                        backgroundColor: Gradients.PURPLE.solid,
                        overflow: 'hidden',
                    }}
                /> */}
                {/* <Icon
                    style={{ position: 'absolute' }}
                    family="materialcommunity"
                    name="hexagon"
                    size={100}
                    colour={Gradients.PURPLE.solid}
                />
                <Icon
                    style={{ position: 'absolute' }}
                    family="materialcommunity"
                    name="hexagon"
                    size={85}
                    colour={theme.background}
                />

                <Icon
                    style={{ position: 'absolute', bottom: -5, left: 20 }}
                    family="material"
                    name="star"
                    size={30}
                    colour={Gradients.PURPLE.solid}
                />
                <Icon
                    style={{ position: 'absolute', bottom: 2.5, left: 27.5 }}
                    family="material"
                    name="star"
                    size={15}
                    colour={theme.background}
                />
                <Icon
                    style={{ position: 'absolute', bottom: -5, right: 20 }}
                    family="material"
                    name="star"
                    size={30}
                    colour={Gradients.PURPLE.solid}
                />
                <Icon
                    style={{ position: 'absolute', bottom: 2.5, right: 27.5 }}
                    family="material"
                    name="star"
                    size={15}
                    colour={theme.background}
                /> */}

                {/* front */}
                {/* <Icon
                    style={{ position: 'absolute', bottom: -5 }}
                    family="material"
                    name="star"
                    size={40}
                    colour={Gradients.PURPLE.solid}
                />
                <Icon
                    style={{ position: 'absolute', bottom: 5 }}
                    family="material"
                    name="star"
                    size={20}
                    colour={theme.background}
                /> */}

                {/* <Text>JUN</Text>
                <Text>2021</Text> */}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {Object.values(habits).map(habit => {
                    return (
                        <View
                            key={habit.id}
                            style={{
                                position: 'relative',
                                height: 100,
                                width: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Icon
                                style={{ position: 'absolute' }}
                                family="material"
                                name="shield"
                                size={100}
                                colour={Gradients[habit.colour].solid}
                            />
                            <Icon
                                style={{ position: 'absolute' }}
                                family="material"
                                name="shield"
                                size={90}
                                colour={theme.background}
                            />
                            <Icon
                                style={{ position: 'absolute' }}
                                family={habit.icon.family}
                                name={habit.icon.name}
                                size={40}
                                colour={Gradients[habit.colour].solid}
                            />
                            {/* <View style={{ position: 'absolute', bottom: -5 }}>
                                <AwardStars colour={Gradients[habit.colour].solid} />
                            </View> */}
                            {/* <Icon
                                style={{ position: 'absolute', bottom: -10 }}
                                family="material"
                                name="star"
                                size={40}
                                colour={Gradients[habit.colour].solid}
                            />
                            <Icon
                                style={{ position: 'absolute', bottom: 0 }}
                                family="material"
                                name="star"
                                size={20}
                                colour={theme.background}
                            /> */}
                        </View>
                    );
                })}
            </View>

            {/* <View
                style={{
                    position: 'relative',
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LinearGradient
                    colors={[Gradients.PURPLE.start, Gradients.PURPLE.end]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <Icon family="fontawesome" name="star" size={80} colour={theme.background} />
                <Icon
                    style={{ position: 'absolute' }}
                    family="materialcommunity"
                    name="soccer"
                    size={30}
                    colour={Gradients.PURPLE.solid}
                /> */}
            {/* <View style={{ position: 'absolute' }}>
                    <Text>TEST</Text>
                    <Text>TEST</Text>
                </View> */}
            {/* </View> */}
        </GrowScrollView>
    );

    // return (
    //     <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={HabitScroll} showsVerticalScrollIndicator={false}>
    //         <Habitual />
    //     </ScrollView>
    // );
};

export default AwardsScreen;
