import Icon from 'Components/Icon';
import React, { Dispatch } from 'react';
import { View } from 'react-native';
import { Gradients, GreyColours } from 'Styles/Colours';
import { RowBetween, MarginLeft, MarginRight } from 'Styles/Globals';
import { ProgressTextInput, SqaureButton } from './CountModule.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { HabitObject } from 'Types/Habit.types';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';

interface CountModuleProps {
    habit: HabitObject;
    dispatchBuild: Dispatch<BuildAction>;
}

export const CountModule: React.FC<CountModuleProps> = ({ habit, dispatchBuild }) => {
    const colour = Gradients[habit.colour].solid;

    const handleProgressChange = (text: string): void => {
        dispatchBuild(buildActions.total(Number(text)));
    };

    const handleAddProgress = (): void => {
        dispatchBuild(buildActions.total(habit.total + 1));
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleRemoveProgress = (): void => {
        dispatchBuild(buildActions.total(habit.total - 1));
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
