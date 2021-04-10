import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { BuildNavProps } from 'Navigation/Params';
import { AppContext } from 'Context/AppContext';
import { GradientColours } from 'Styles/Colours';
import { SaveButton, SaveContainer, SaveText } from './SaveModule.styles';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface SaveModuleProps {
    habit: IHabit;
    navigation: BuildNavProps;
}

export const bottomOffset = 100;

const SaveModule: React.FC<SaveModuleProps> = ({ habit, navigation }) => {
    const { updateHabit } = useContext(AppContext);

    const handleSave = (): void => {
        if (habit.name === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a name for your new habit',
                position: 'bottom',
                bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else if (Object.values(habit.schedule).every(value => value === false)) {
            Toast.show({
                type: 'error',
                text1: 'Please schedule your habit for at least one day',
                position: 'bottom',
                bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else if (habit.total === 0) {
            Toast.show({
                type: 'error',
                text1: 'Please assign a count to your habit',
                position: 'bottom',
                bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else {
            navigation.goBack();
            ReactNativeHapticFeedback.trigger('notificationSuccess');
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
