import { useTheme } from '@emotion/react';
import { HabitColourContainer, HabitIcon } from 'Components/Habit/Habit.styles';
import Icon from 'Components/Icon';
import { AppContext } from 'Context/AppContext';
import { IAllHabits, ScheduleType } from 'Controllers/HabitController/HabitController';
import moment from 'moment';
import React, { useContext, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
import {
    HabitualProgressContainer,
    HabitualContainer,
    HabitualProgress,
    HabitualText,
    HabitualInfo,
    HabitualInfoContainer,
} from './Habitual.styles';

const progressArray = Array.from(Array(30)).map((value, index) => moment().subtract(index, 'd'));

interface MonthScore {
    achieved: number;
    total: number;
}
const getProgress = (habits: IAllHabits): number => {
    const monthScores: MonthScore[] = [
        { achieved: 0, total: 0 },
        { achieved: 0, total: 0 },
        { achieved: 0, total: 0 },
    ];

    progressArray.forEach((date, index) => {
        const monthIndex = Math.floor(index / 10);
        Object.values(habits).forEach(habit => {
            if (habit.schedule[date.format('ddd').toUpperCase() as ScheduleType] === true) {
                const day = date.format('YYYY-MM-DD');
                if (habit.dates[day] && habit.dates[day].progress >= habit.dates[day].progressTotal) {
                    monthScores[monthIndex].achieved += 1;
                }
                monthScores[monthIndex].total += 1;
            }
        });
    });

    const monthAverages = monthScores.map(month => month.achieved / month.total);
    return Math.round((monthAverages[0] * 0.6 + monthAverages[1] * 0.3 + monthAverages[2] * 0.1) * 100);
};

const Habitual: React.FC = () => {
    const theme = useTheme();
    const { habits, colour } = useContext(AppContext);
    const gradient = Gradients[colour];

    const progress = useMemo(() => getProgress(habits), [habits]);
    const interpolateProgress = progress * 0.19;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <HabitualContainer>
            {/* <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View
                        style={{
                            width: '90%',
                            height: 200,
                            backgroundColor: theme.card,
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
            <HabitualProgressContainer colour={gradient.solid}>
                {progress === 100 ? (
                    <Icon family="entypo" name="check" size={20} colour={theme.text} style={HabitIcon} />
                ) : (
                    <HabitualProgress>{progress}%</HabitualProgress>
                )}

                <HabitColourContainer colour={gradient.solid} style={{ transform: [{ scale: interpolateProgress }] }}>
                    <LinearGradient
                        colors={[gradient.start, gradient.end]}
                        locations={[0.3, 1]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0 }}
                    />
                </HabitColourContainer>
            </HabitualProgressContainer>
            <HabitualInfoContainer onPress={() => setModalVisible(true)}>
                <Icon family="feather" name="info" size={16} colour={theme.text} style={HabitualInfo} />
            </HabitualInfoContainer>

            <HabitualText>HABITUAL</HabitualText>
        </HabitualContainer>
    );
};

export default Habitual;
