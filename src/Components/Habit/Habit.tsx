import { IHabit } from 'Controllers/HabitController/HabitController';
import { Action, habitReducer } from 'Controllers/HabitController/HabitReducer';
import { TabNavProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent, Swipeable } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AppContext } from 'Context/AppContext';
import RightActions, { renderRightActions } from './RightActions';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { HabitContainer, HabitContentContainer, HabitIcon, HabitIconContainer } from './Habit.styles';
import Icon from 'Components/Icon';
import { useTheme } from '@emotion/react';

interface HabitProps {
    navigation: TabNavProps;
    initialHabit: IHabit;
    date: string;
}

const updateHabitState = (initialHabit: IHabit, habit: IHabit, habitDispatch: React.Dispatch<Action>): void => {
    // Updating name
    initialHabit.name !== habit.name && habitDispatch({ type: 'name', payload: { name: initialHabit.name } });
    // Updating colour
    initialHabit.colour !== habit.colour && habitDispatch({ type: 'colour', payload: { colour: initialHabit.colour } });
    // Updating icon
    initialHabit.icon !== habit.icon && habitDispatch({ type: 'icon', payload: { icon: initialHabit.icon } });
    // Updating total
    initialHabit.total !== habit.total && habitDispatch({ type: 'total', payload: { total: initialHabit.total } });
    // Updating schedule
    initialHabit.schedule !== habit.schedule &&
        habitDispatch({ type: 'schedule', payload: { schedule: initialHabit.schedule } });
};

const Habit: React.FC<HabitProps> = ({ navigation, initialHabit, date }) => {
    // Thene styles
    const theme = useTheme();

    // Habit and context actions
    const { updateHabit, deleteHabit } = useContext(AppContext);
    const [habit, habitDispatch] = useReducer(habitReducer, initialHabit);

    // Updating habit from initial habit
    useEffect(() => {
        updateHabitState(initialHabit, habit, habitDispatch);
    }, [initialHabit, habit]);

    const handleView = (): void => {
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    // Gesture references
    const swipableRef = useRef<Swipeable>(null);
    const panRef = useRef<PanGestureHandler>(null);

    // Gesture handler
    const handleGesture = useCallback((event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.velocityX > 1000) {
            habitDispatch({ type: 'progress', payload: { date: date, progress: habit.total } });
        }
    }, []);

    const handleGestureEnd = useCallback(() => {}, []);

    return (
        <Swipeable
            ref={swipableRef}
            waitFor={panRef}
            renderRightActions={progress =>
                renderRightActions(swipableRef, progress, habit.id, navigation, deleteHabit)
            }
        >
            <PanGestureHandler
                ref={panRef}
                activeOffsetX={[-1000, 20]}
                failOffsetX={[0, 1000]}
                minDeltaX={0}
                onGestureEvent={handleGesture}
                onHandlerStateChange={handleGestureEnd}
            >
                <HabitContainer>
                    <TouchableWithoutFeedback onPress={handleView} style={StyleSheet.absoluteFill}>
                        <HabitContentContainer>
                            <HabitIconContainer>
                                <Icon
                                    family={habit.icon.family}
                                    name={habit.icon.name}
                                    size={18}
                                    colour={theme.text}
                                    style={HabitIcon}
                                />
                            </HabitIconContainer>
                            <Text style={{ backgroundColor: 'red' }}>{habit.name}</Text>
                        </HabitContentContainer>
                    </TouchableWithoutFeedback>
                </HabitContainer>
            </PanGestureHandler>
        </Swipeable>
    );
};

export default Habit;
