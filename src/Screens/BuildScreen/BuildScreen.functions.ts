import { DEFAULT_GESTURE_RESPONSE } from 'Components/DismissableScrollView/DismissableScrollView';
import { getRandomColour } from 'Helpers/RandomColour';
import { BuildNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { useRef, useCallback, RefObject, useState, Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { DEFAULT_HABIT } from 'Types/Habit.constants';
import { Habits, HabitObject } from 'Types/Habit.types';
import { v4 } from 'uuid';

// Get the initial habit for the build reducer
export const getInitialHabit = (habits: Habits, id?: string): HabitObject => {
    return id ? habits[id] : { ...DEFAULT_HABIT, id: v4(), colour: getRandomColour() };
};

// Content options
type BuildScreenModal = 'Mount' | 'Icon' | 'Time' | 'Reminder';

// Snap point options
type BuildScreenSnaps = {
    [key in BuildScreenModal]: string;
};

// Snap point values
export const BuildScreenSnapPoints: BuildScreenSnaps = {
    Mount: '0px',
    Icon: '70%',
    Time: '55%',
    Reminder: '55%',
};

interface UseBuildModal {
    modal: BuildScreenModal;
    setModal: Dispatch<SetStateAction<BuildScreenModal>>;
    sheetRef: RefObject<BottomSheet>;
    shadowRef: Animated.Value<number>;
    handleOpen: () => void;
    handleClose: () => void;
}

// Mondal hook
export const useBuildModal = (navigation: BuildNavProps): UseBuildModal => {
    const [modal, setModal] = useState<BuildScreenModal>('Mount');

    // Bottom sheet
    const sheetRef = useRef<BottomSheet>(null);
    const shadowRef = useRef(new Animated.Value<number>(1)).current;

    // Opens the bottom sheet
    const handleOpen = useCallback((): void => {
        sheetRef.current?.snapTo(0);
        navigation.setOptions({
            gestureResponseDistance: DEFAULT_GESTURE_RESPONSE,
        });
    }, [navigation]);

    // Closes the bottom sheet
    const handleClose = useCallback((): void => {
        sheetRef.current?.snapTo(1);
        navigation.setOptions({
            gestureResponseDistance: Dimensions.get('screen').height,
        });
        setModal('Mount');
    }, [navigation]);

    return { modal, setModal, sheetRef, shadowRef, handleOpen, handleClose };
};
