import React, { Dispatch, FC } from 'react';
import { StyleSheet } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { SaveButton, SaveContainer, SaveText } from './BuildSave.styles';
import { BuildNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitObject, Habits } from 'Types/Habit.types';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { habitErrorMessage, validateHabit } from './BuildSave.functions';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import PushNotification from 'react-native-push-notification';

interface BuildSaveProps {
    habit: HabitObject;
    dispatchHabits: Dispatch<HabitAction>;
    navigation: BuildNavProps;
}

const BuildSave: FC<BuildSaveProps> = ({ habit, dispatchHabits, navigation }) => {
    const handleSave = (): void => {
        const error = validateHabit(habit);
        if (error) {
            Toast.show({
                type: 'error',
                text1: habitErrorMessage[error],
                position: 'bottom',
            });
            ReactNativeHapticFeedback.trigger('notificationError');
        } else {
            navigation.goBack();
            dispatchHabits(habitActions.create(habit));
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

export default BuildSave;
