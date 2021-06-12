// import { ISchedule, ScheduleType } from 'Controllers/HabitController/HabitController';
import React, { Dispatch, useCallback, useMemo } from 'react';
import { Colour } from 'Types/Colour.types';
import { StyleSheet } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { BuildAction } from 'Reducers/BuildReducer/BuildReducer.types';
import { Schedule, ScheduleType } from 'Types/Habit.types';
import { buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { ScheduleButton, ScheduleContainer, ScheduleText } from './Scheduler.styles';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ScheduleProps {
    colour: Colour;
    schedule: Schedule;
    dispatchBuild: Dispatch<BuildAction>;
}

const Scheduler: React.FC<ScheduleProps> = ({ colour, schedule, dispatchBuild }) => {
    const gradient = useMemo(() => Gradients[colour], [colour]);

    const handleSchedule = useCallback(
        (day: ScheduleType) => {
            dispatchBuild(buildActions.day(!schedule[day], day));
            ReactNativeHapticFeedback.trigger('impactLight');
        },
        [dispatchBuild, schedule],
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
