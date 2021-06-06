import React, { Dispatch, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { IHabit } from 'Controllers/HabitController/HabitController';
// import { BuildNavProps } from 'Navigation/Params';
import { AppContext } from 'Context/AppContext';
import { Gradients } from 'Styles/Colours';
import { SaveButton, SaveContainer, SaveText } from './SaveModule.styles';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { BuildNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitObject } from 'Types/Habit.types';
import { HabitAction } from 'Reducers/HabitsReducer/HabitsReducer.types';
import { habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';

interface SaveModuleProps {
    habit: HabitObject;
    dispatchHabits: Dispatch<HabitAction>;
    navigation: BuildNavProps;
}

export const bottomOffset = 100;

const SaveModule: React.FC<SaveModuleProps> = ({ habit, dispatchHabits, navigation }) => {
    // const { updateHabit } = useContext(AppContext);

    const handleSave = (): void => {
        if (habit.name === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a name for your new habit',
                position: 'bottom',
                // bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else if (Object.values(habit.schedule).every(value => value === false)) {
            Toast.show({
                type: 'error',
                text1: 'Please schedule your habit for at least one day',
                position: 'bottom',
                // bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else if (habit.total === 0) {
            Toast.show({
                type: 'error',
                text1: 'Please assign a count to your habit',
                position: 'bottom',
                // bottomOffset: bottomOffset,
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else {
            navigation.goBack();
            ReactNativeHapticFeedback.trigger('notificationSuccess');
            dispatchHabits(habitActions.add(habit));
            // updateHabit(habit);
        }
    };

    return (
        <SaveContainer>
            <SaveButton onPress={handleSave}>
                <LinearGradient
                    colors={[Gradients[habit.colour].start, Gradients[habit.colour].end]}
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
