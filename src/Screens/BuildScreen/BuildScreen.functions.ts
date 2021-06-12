import { DEFAULT_GESTURE_RESPONSE } from 'Components/DismissableScrollView/DismissableScrollView';
import { BuildNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { useRef, useCallback, RefObject, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

// Content options
type BuildScreenModal = 'Mount' | 'Icon' | 'Time';

// Snap point options
type BuildScreenSnaps = {
    [key in BuildScreenModal]: string;
};

// Snap point values
export const BuildScreenSnapPoints: BuildScreenSnaps = {
    Mount: '0px',
    Icon: '70%',
    Time: '300px',
};

interface UseBuildModal {
    modal: BuildScreenModal;
    setModal: Dispatch<SetStateAction<BuildScreenModal>>;
    sheetRef: RefObject<BottomSheet>;
    shadowRef: Animated.Value<number>;
    handleOpen: () => void;
    handleClose: () => void;
}

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
    }, [navigation]);

    return { modal, setModal, sheetRef, shadowRef, handleOpen, handleClose };
};
