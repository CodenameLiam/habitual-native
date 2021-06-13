import Icon from 'Components/Icon';
import React, { FC, Fragment } from 'react';
import { Text } from 'react-native';
import { HabitAction, habitActions } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { GreyColours } from 'Styles/Colours';
import { HabitObject } from 'Types/Habit.types';
import { ProgressButton, ProgressButtonContainer } from './ViewProgressButton.styles';

interface ProgressButtonModuleProps {
    date: string;
    colour: string;
    progress: number;
    habit: HabitObject;
    dispatchHabits: (action: HabitAction) => void;
}

const ProgressButtonModule: FC<ProgressButtonModuleProps> = ({ date, colour, progress, habit, dispatchHabits }) => {
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
                            <ProgressButton
                                colour={progress > 0 ? colour : GreyColours.GREY2}
                                // disabled={false}
                                // onPress={() => dispatchHabits(habitActions.progress(habit, date, progress - 1, false))}
                            ></ProgressButton>
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
                }[habit.type]
            }
        </ProgressButtonContainer>
    );
};

export default ProgressButtonModule;
