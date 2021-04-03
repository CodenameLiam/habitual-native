import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Icon from 'Components/Icon';
import { IHabit, mergeDates, provideFeedback } from 'Controllers/HabitController/HabitController';
import React from 'react';
import { GreyColours } from 'Styles/Colours';

import { ProgressButton, ProgressButtonContainer } from './ProgressButtonModule.styles';

// Debouncing update to prevent lag during excessive renders
const updateHabitDebounced = AwesomeDebouncePromise(
    (habit: IHabit, updateHabit: (habit: IHabit) => Promise<void>, date: string, progress: number) => {
        updateHabit({ ...habit, dates: mergeDates(habit, date, progress) });
    },
    500,
);

interface ProgressButtonModuleProps {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    date: string;
    colour: string;
    habit: IHabit;
    updateHabit: (habit: IHabit) => Promise<void>;
}

const ProgressButtonModule: React.FC<ProgressButtonModuleProps> = ({
    progress,
    setProgress,
    date,
    colour,
    habit,
    updateHabit,
}) => {
    return (
        <ProgressButtonContainer>
            <ProgressButton
                colour={progress > 0 ? colour : GreyColours.GREY2}
                disabled={progress <= 0}
                onPress={() => {
                    setProgress(progress - 1);
                    updateHabitDebounced(habit, updateHabit, date, progress - 1);
                }}
            >
                <Icon family="fontawesome" name="minus" size={24} colour={progress > 0 ? colour : GreyColours.GREY2} />
            </ProgressButton>
            <ProgressButton
                colour={colour}
                onPress={() => {
                    setProgress(progress + 1);
                    updateHabitDebounced(habit, updateHabit, date, progress + 1);
                    provideFeedback(habit, progress + 1);
                }}
            >
                <Icon family="fontawesome" name="plus" size={24} colour={colour} />
            </ProgressButton>

            <ProgressButton
                colour={colour}
                onPress={() => {
                    setProgress(progress >= habit.total ? 0 : habit.total);
                    provideFeedback(habit, progress >= habit.total ? 0 : habit.total);
                    updateHabitDebounced(habit, updateHabit, date, progress >= habit.total ? 0 : habit.total);
                }}
            >
                <Icon family="fontawesome" name="check" size={24} colour={colour} />
            </ProgressButton>
        </ProgressButtonContainer>
    );
};

export default ProgressButtonModule;
