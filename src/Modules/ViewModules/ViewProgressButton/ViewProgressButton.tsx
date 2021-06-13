import Icon from 'Components/Icon';
import React, { FC, Fragment, useEffect, useState, MutableRefObject, useCallback } from 'react';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { GreyColours } from 'Styles/Colours';
import { HabitObject } from 'Types/Habit.types';
import { ProgressButton, ProgressButtonContainer } from './ViewProgressButton.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ViewNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { handleBack, handleTimeBack } from 'Components/Headers/ViewHeader';
import BackIcon from 'Components/HeaderIcons/BackIcon';
import { useTheme } from '@emotion/react';

interface ProgressButtonModuleProps {
    date: string;
    colour: string;
    progress: number;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
    playingRef: MutableRefObject<boolean>;
    navigation: ViewNavProps;
}

const ProgressButtonModule: FC<ProgressButtonModuleProps> = ({
    date,
    colour,
    progress,
    habit,
    dispatchHabits,
    playingRef,
    navigation,
}) => {
    const theme = useTheme();
    // Interval and playing state
    let interval: NodeJS.Timeout;
    const [playing, setPlaying] = useState(false);

    // If playing, add one second
    useEffect(() => {
        if (playing) {
            if (progress < habit.total) {
                interval = setTimeout(
                    () =>
                        dispatchHabits(
                            habitActions.progress(habit, date, progress + 1, progress === habit.total, false),
                        ),
                    1000,
                );
            } else {
                setPlaying(false);
            }
        }
        return () => clearTimeout(interval);
    }, [date, dispatchHabits, habit, playing, progress]);

    // Pause the habit and complete it
    const handleCheck = useCallback((): void => {
        playingRef.current = false;
        clearInterval(interval);
        setPlaying(false);
        dispatchHabits(
            habitActions.progress(habit, date, progress >= habit.total ? 0 : habit.total, progress < habit.total),
        );
    }, [date, dispatchHabits, habit, playingRef, progress]);

    // Toggle playing the habit
    const handlePlay = useCallback((): void => {
        setPlaying(!playing);
        playingRef.current = !playing;
        ReactNativeHapticFeedback.trigger('impactMedium');
        navigation.setOptions({
            gestureEnabled: playing,
            headerLeft: () => (
                <BackIcon
                    colour={theme.text}
                    handlePress={!playing ? () => handleTimeBack(navigation) : () => handleBack(navigation)}
                />
            ),
        });
    }, [colour, navigation, playing, playingRef]);

    return (
        <ProgressButtonContainer>
            {
                {
                    count: (
                        <Fragment>
                            <ProgressButton
                                colour={progress > 0 ? colour : GreyColours.GREY2}
                                disabled={progress <= 0}
                                onPress={() => dispatchHabits(habitActions.progress(habit, date, progress - 1, false))}
                            >
                                <Icon
                                    family="fontawesome"
                                    name="minus"
                                    size={24}
                                    colour={progress > 0 ? colour : GreyColours.GREY2}
                                />
                            </ProgressButton>
                            <ProgressButton
                                colour={colour}
                                onPress={() =>
                                    dispatchHabits(
                                        habitActions.progress(habit, date, progress + 1, progress + 1 === habit.total),
                                    )
                                }
                            >
                                <Icon family="fontawesome" name="plus" size={24} colour={colour} />
                            </ProgressButton>

                            <ProgressButton
                                colour={colour}
                                onPress={() =>
                                    dispatchHabits(
                                        habitActions.progress(
                                            habit,
                                            date,
                                            progress >= habit.total ? 0 : habit.total,
                                            progress < habit.total,
                                        ),
                                    )
                                }
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
