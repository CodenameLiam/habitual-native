import { ISchedule, ScheduleType } from 'Controllers/HabitController/HabitController';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColours, IColours } from 'Styles/Colours';
import { ScheduleButton, ScheduleContainer, ScheduleText } from './Scheduler.styles';

interface ScheduleProps {
    colour: IColours;
    schedule: ISchedule;
    setSchedule: (newSchedule: ISchedule) => void;
}

const Scheduler: React.FC<ScheduleProps> = ({ colour, schedule, setSchedule }) => {
    const gradient = GradientColours[colour];

    const handleSchedule = useCallback(
        (day: ScheduleType) => {
            const tempSchedule = schedule;
            tempSchedule[day] = !tempSchedule[day];
            setSchedule(tempSchedule);
        },
        [schedule, setSchedule],
    );

    return (
        <ScheduleContainer>
            {Object.keys(schedule).map(day => (
                <ScheduleButton key={day} onPress={() => handleSchedule(day as ScheduleType)}>
                    {schedule[day as ScheduleType] && (
                        <LinearGradient
                            colors={[gradient.start, gradient.end]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                    )}
                    <ScheduleText grey={!schedule[day as ScheduleType]}>{day[0]}</ScheduleText>
                </ScheduleButton>
            ))}
        </ScheduleContainer>
    );
};

export default Scheduler;
