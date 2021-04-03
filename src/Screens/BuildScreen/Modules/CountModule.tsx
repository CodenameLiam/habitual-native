import Icon from 'Components/Icon';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { Action } from 'Controllers/HabitController/HabitReducer';
import React from 'react';
import { View } from 'react-native';
import { GradientColours, GreyColours } from 'Styles/Colours';
import { RowBetween, MarginLeft, MarginRight } from 'Styles/Globals';
import { ProgressTextInput, SqaureButton } from './CountModule.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface CountModuleProps {
    habit: IHabit;
    habitDispatch: React.Dispatch<Action>;
}

export const CountModule: React.FC<CountModuleProps> = ({ habit, habitDispatch }) => {
    const colour = GradientColours[habit.colour].solid;

    const handleProgressChange = (text: string): void => {
        habitDispatch({ type: 'total', payload: { total: Number(text) } });
    };

    const handleAddProgress = (): void => {
        habitDispatch({ type: 'total', payload: { total: habit.total + 1 } });
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleRemoveProgress = (): void => {
        habitDispatch({ type: 'total', payload: { total: habit.total - 1 } });
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <View style={RowBetween}>
            <ProgressTextInput
                returnKeyType="done"
                keyboardType="number-pad"
                colour={colour}
                onChangeText={handleProgressChange}
                value={habit.total > 0 ? habit.total.toString() : ''}
            />
            <SqaureButton
                colour={colour}
                onPress={handleRemoveProgress}
                disabled={Number(habit.total) <= 1}
                grey={Number(habit.total) <= 1}
                style={[MarginLeft, MarginRight]}
            >
                <Icon
                    family="fontawesome"
                    name="minus"
                    size={24}
                    colour={Number(habit.total) > 1 ? colour : GreyColours.GREY2}
                />
            </SqaureButton>
            <SqaureButton onPress={handleAddProgress} colour={colour} grey={false}>
                <Icon family="fontawesome" name="plus" size={24} colour={colour} />
            </SqaureButton>
        </View>
    );
};
