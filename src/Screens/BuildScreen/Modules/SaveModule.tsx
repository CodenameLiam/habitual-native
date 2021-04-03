import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { BuildNavProps } from 'Navigation/Params';
import { AppContext } from 'Context/AppContext';
import { GradientColours } from 'Styles/Colours';
import { SaveButton, SaveContainer, SaveText } from './SaveModule.styles';
import LinearGradient from 'react-native-linear-gradient';

interface SaveModuleProps {
    habit: IHabit;
    navigation: BuildNavProps;
}

const SaveModule: React.FC<SaveModuleProps> = ({ habit, navigation }) => {
    const { updateHabit } = useContext(AppContext);

    const handleSave = (): void => {
        if (habit.name === '') {
            // Toast.show({
            //     type: 'error',
            //     text1: 'Please enter a name for your new habit',
            //     position: 'bottom',
            //     bottomOffset: 150,
            // });
            // notificationAsync(NotificationFeedbackType.Error);
        } else if (Object.values(habit.schedule).every(value => value === false)) {
            // Toast.show({
            //     type: 'error',
            //     text1: 'Please schedule your habit for at least one day',
            //     position: 'bottom',
            //     bottomOffset: 150,
            // });
            // notificationAsync(NotificationFeedbackType.Error);
        } else if (habit.total === 0) {
            // Toast.show({
            //     type: 'error',
            //     text1: 'Please assign time to your habit',
            //     position: 'bottom',
            //     bottomOffset: 150,
            // });
            // notificationAsync(NotificationFeedbackType.Error);
        } else {
            navigation.goBack();

            // notificationAsync(NotificationFeedbackType.Success);
            updateHabit(habit);
        }
    };

    return (
        <SaveContainer>
            <SaveButton onPress={handleSave}>
                <LinearGradient
                    colors={[GradientColours[habit.colour].start, GradientColours[habit.colour].end]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <SaveText>Save</SaveText>
            </SaveButton>
        </SaveContainer>
    );
};

export default SaveModule;
