// import AwesomeDebouncePromise from 'awesome-debounce-promise';
// import Icon from 'Components/Icon';
// import { IHabit, mergeDates, provideFeedback } from 'Controllers/HabitController/HabitController';
// import { GreyColours } from 'Styles/Colours';

import Icon from 'Components/Icon';
import React, { FC } from 'react';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { GreyColours } from 'Styles/Colours';
import { HabitObject } from 'Types/Habit.types';
import { ProgressButton, ProgressButtonContainer } from './ViewProgressButton.styles';

// import { ProgressButton, ProgressButtonContainer } from './ViewProgressButton.styles';

// // Debouncing update to prevent lag during excessive renders
// export const updateHabitDebounced = AwesomeDebouncePromise(
//     (habit: IHabit, updateHabit: (habit: IHabit) => Promise<void>, date: string, progress: number) => {
//         updateHabit({ ...habit, dates: mergeDates(habit, date, progress) });
//     },
//     600,
// );

interface ProgressButtonModuleProps {
    date: string;
    colour: string;
    progress: number;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
    // progress: number;
    // setProgress: React.Dispatch<React.SetStateAction<number>>;
    // date: string;
    // colour: string;
    // habit: IHabit;
    // updateHabit: (habit: IHabit) => Promise<void>;
}

const ProgressButtonModule: FC<ProgressButtonModuleProps> = ({
    // setProgress,
    date,
    colour,
    progress,
    habit,
    dispatchHabits,
    // updateHabit,
}) => {
    return (
        <ProgressButtonContainer>
            <ProgressButton
                colour={progress > 0 ? colour : GreyColours.GREY2}
                disabled={progress <= 0}
                onPress={() => dispatchHabits(habitActions.progress(habit, date, progress - 1, false))}
            >
                <Icon family="fontawesome" name="minus" size={24} colour={progress > 0 ? colour : GreyColours.GREY2} />
            </ProgressButton>
            <ProgressButton
                colour={colour}
                onPress={() =>
                    dispatchHabits(habitActions.progress(habit, date, progress + 1, progress + 1 === habit.total))
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
        </ProgressButtonContainer>
    );
};

export default ProgressButtonModule;
