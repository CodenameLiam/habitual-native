import Icon from 'Components/Icon';
import React, { FC, Fragment, useState, MutableRefObject, useCallback, Dispatch, SetStateAction } from 'react';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { GreyColours } from 'Styles/Colours';
import { HabitObject } from 'Types/Habit.types';
import { ProgressButton, ProgressButtonContainer } from './ViewProgressButton.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ViewNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { handleBack, handleTimeBack } from 'Components/Headers/ViewHeader';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { useTheme } from '@emotion/react';
import { useDebouncedCallback } from 'use-debounce/lib';
import BackgroundTimer from 'react-native-background-timer';

interface ProgressButtonModuleProps {
    date: string;
    colour: string;
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
    playingRef: MutableRefObject<boolean>;
    navigation: ViewNavProps;
}

const ProgressButtonModule: FC<ProgressButtonModuleProps> = ({
    date,
    colour,
    progress,
    setProgress,
    habit,
    dispatchHabits,
    playingRef,
    navigation,
}) => {
    // Theme
    const theme = useTheme();

    // Playing state
    const [playing, setPlaying] = useState(false);

    // Debounce progress to improve perceived performance
    const debounceProgress = useDebouncedCallback(() => {
        dispatchHabits(habitActions.progress(habit, date, progress, false, false));
    }, 500);

    // Update navigation options when the timer is started to prevent stray timers from being started
    const handleNavigationOptions = useCallback(() => {
        navigation.setOptions({
            gestureEnabled: playing,
            headerLeft: () => (
                <BackIcon
                    colour={theme.text}
                    handlePress={!playing ? () => handleTimeBack(navigation) : () => handleBack(navigation)}
                />
            ),
        });
    }, [navigation, playing, theme.text]);

    // Pause the habit and complete it
    const handleCheck = useCallback((): void => {
        playingRef.current = false;
        setPlaying(false);
        handleNavigationOptions();
        BackgroundTimer.stopBackgroundTimer();
        dispatchHabits(
            habitActions.progress(habit, date, progress >= habit.total ? 0 : habit.total, progress < habit.total),
        );
    }, [date, dispatchHabits, habit, handleNavigationOptions, playingRef, progress]);

    // Toggle playing the habit
    const handlePlay = useCallback((): void => {
        if (playing) {
            BackgroundTimer.stopBackgroundTimer();
        } else {
            BackgroundTimer.runBackgroundTimer(() => {
                dispatchHabits(habitActions.time(habit, date));
            }, 1000);
        }

        setPlaying(!playing);
        handleNavigationOptions();
        playingRef.current = !playing;
        ReactNativeHapticFeedback.trigger('impactMedium');
    }, [date, dispatchHabits, habit, handleNavigationOptions, playing, playingRef]);

    // Substract one from the habit (debounced)
    const handleSubtract = useCallback(() => {
        ReactNativeHapticFeedback.trigger('impactMedium');
        setProgress(progress - 1);
        debounceProgress();
    }, [debounceProgress, progress, setProgress]);

    // Add one to the habit (debounced)
    const handleAdd = useCallback(() => {
        ReactNativeHapticFeedback.trigger(progress + 1 === habit.total ? 'notificationSuccess' : 'impactMedium');
        setProgress(progress + 1);
        debounceProgress();
    }, [debounceProgress, habit.total, progress, setProgress]);

    return (
        <ProgressButtonContainer>
            {
                {
                    count: (
                        <Fragment>
                            <ProgressButton
                                colour={progress > 0 ? colour : GreyColours.GREY2}
                                disabled={progress <= 0}
                                onPress={handleSubtract}
                            >
                                <Icon
                                    family="fontawesome"
                                    name="minus"
                                    size={24}
                                    colour={progress > 0 ? colour : GreyColours.GREY2}
                                />
                            </ProgressButton>
                            <ProgressButton colour={colour} onPress={handleAdd}>
                                <Icon family="fontawesome" name="plus" size={24} colour={colour} />
                            </ProgressButton>
                            <ProgressButton
                                colour={colour}
                                onPress={() => dispatchHabits(habitActions.toggle(habit, date))}
                            >
                                <Icon family="fontawesome" name="check" size={24} colour={colour} />
                            </ProgressButton>
                        </Fragment>
                    ),
                    time: (
                        <Fragment>
                            <ProgressButton colour={colour} onPress={handlePlay}>
                                <Icon
                                    family="fontawesome5"
                                    name={playing ? 'pause' : 'play'}
                                    size={18}
                                    colour={colour}
                                />
                            </ProgressButton>
                            <ProgressButton colour={colour} onPress={handleCheck}>
                                <Icon family="fontawesome" name="check" size={24} colour={colour} />
                            </ProgressButton>
                        </Fragment>
                    ),
                }[habit.type]
            }
        </ProgressButtonContainer>
    );
};

export default ProgressButtonModule;
