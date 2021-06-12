import { useTheme } from '@emotion/react';
import Icon from 'Components/Icon';
import React from 'react';
import { Animated } from 'react-native';
import { RightAction } from './Habit.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteAlert } from 'Helpers/DeleteAlert';
import { TabNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';

interface RightActionProps {
    progress: Animated.AnimatedInterpolation;
    handleEdit: () => void;
    confirmDelete: () => void;
}

const RightActions: React.FC<RightActionProps> = ({ progress, confirmDelete, handleEdit }) => {
    const theme = useTheme();
    const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [160, 0],
        extrapolate: 'clamp',
    });

    const handleDelete = (): void => {
        deleteAlert(confirmDelete);
    };

    return (
        <Animated.View
            style={{
                flexDirection: 'row',
                transform: [{ translateX: trans }],
                width: 160,
            }}
        >
            <RightAction onPress={handleEdit}>
                <Icon family="feather" name="edit" size={30} colour={theme.text} />
            </RightAction>
            <RightAction onPress={handleDelete}>
                <Icon family="feather" name="trash-2" size={30} colour={theme.text} />
            </RightAction>
        </Animated.View>
    );
};

export default RightActions;

export const renderRightActions = (
    id: string,
    navigation: TabNavProps,
    swipableRef: React.RefObject<Swipeable>,
    progress: Animated.AnimatedInterpolation,
    dispatchHabits: (action: HabitAction) => void,
): React.ReactNode => {
    // Edits the current habit
    const handleEdit = (): void => {
        swipableRef.current?.close();
        ReactNativeHapticFeedback.trigger('impactLight');
        navigation.navigate('Build', { id: id });
    };

    // Deletes the current habit
    const confirmDelete = (): void => {
        dispatchHabits(habitActions.delete(id));
        ReactNativeHapticFeedback.trigger('notificationSuccess');
    };

    return <RightActions progress={progress} confirmDelete={confirmDelete} handleEdit={handleEdit} />;
};
