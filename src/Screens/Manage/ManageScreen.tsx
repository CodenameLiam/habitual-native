import { useTheme } from '@emotion/react';
import { GrowContainer, GrowScrollContent, GrowShadow } from 'Components/GrowScrollView/GrowScrollView.styles';
import { HabitText, HabitTextContainer } from 'Components/Habit/Habit.styles';
import Icon from 'Components/Icon';
import { useHabits } from 'Context/AppContext';
import { deleteAlert } from 'Helpers/DeleteAlert';
import { ManageNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';
import { habitActions, OrderArray } from 'Reducers/HabitsReducer/HabitReducer.actions';
import { Gradients } from 'Styles/Colours';
import { HabitObject } from 'Types/Habit.types';
import * as Styles from './ManageScreen.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { getSortedHabits } from 'Helpers/Habits';

interface ManageScreenProps {
    navigation: ManageNavProps;
}

const ManageScreen: FC<ManageScreenProps> = ({ navigation }) => {
    // Theme
    const theme = useTheme();

    // Habits and local state
    const [habits, dispatchHabits] = useHabits();
    const [data, setData] = useState(Object.values(habits));

    // Handle habit updates
    useEffect(() => {
        setData(getSortedHabits(habits));
    }, [habits]);

    // Handle dropping a draggable habit
    const handleDragEnd = (params: DragEndParams<HabitObject>): void => {
        const orderArray: OrderArray[] = params.data.map((habit, index) => ({ id: habit.id, order: index + 1 }));
        dispatchHabits(habitActions.order(orderArray));
        setData(params.data);
        navigation.setOptions({ gestureEnabled: true });
    };

    // Handle deleting a habit
    const handleDelete = useCallback(
        (id: string): void => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            dispatchHabits(habitActions.delete(id));
            ReactNativeHapticFeedback.trigger('notificationSuccess');
        },
        [dispatchHabits],
    );

    // Render a item in the draggable list
    const renderItem = useCallback(
        ({ item, index, drag, isActive }: RenderItemParams<HabitObject>) => {
            const handlePress = (): void => {
                navigation.setOptions({ gestureEnabled: false });
                drag();
            };

            return (
                <Styles.Container
                    style={{
                        shadowColor: theme.background,
                        shadowRadius: 15,
                        shadowOpacity: isActive ? 1 : 0,
                        opacity: isActive ? 0.9 : 1,
                    }}
                >
                    <Styles.ManageButton onPress={() => deleteAlert(() => handleDelete(item.id))}>
                        <Icon family="feather" name="trash-2" size={24} colour={theme.text} />
                    </Styles.ManageButton>
                    <Styles.CenterContainer
                        onPress={() =>
                            navigation.navigate('Build', {
                                id: item.id,
                                colour: item.colour,
                            })
                        }
                    >
                        <Icon
                            family={item.icon.family}
                            name={item.icon.name}
                            size={20}
                            colour={Gradients[item.colour].solid}
                            style={{ marginRight: 15 }}
                        />

                        <HabitTextContainer>
                            <HabitText
                                scroll={false}
                                animationType="bounce"
                                duration={3000}
                                bounceDelay={1500}
                                marqueeDelay={1000}
                                bouncePadding={{ left: 0, right: 0 }}
                                style={{ fontSize: 16 }}
                                colour={Gradients[item.colour].solid}
                            >
                                {item.name}
                            </HabitText>
                        </HabitTextContainer>
                    </Styles.CenterContainer>
                    <Styles.ManageButton style={{ opacity: isActive ? 0.5 : 1 }} onPressIn={handlePress}>
                        <Icon family="feather" name="menu" size={24} colour={theme.text} />
                    </Styles.ManageButton>
                </Styles.Container>
            );
        },
        [handleDelete, navigation, theme.background, theme.text],
    );

    return (
        <GrowContainer>
            <GrowShadow
                top
                style={{
                    shadowColor: theme.background,
                    shadowRadius: 2,
                    shadowOpacity: 1,
                    shadowOffset: { height: 5, width: 0 },
                }}
            />
            <DraggableFlatList
                style={GrowScrollContent}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
                onDragEnd={handleDragEnd}
            />
            <GrowShadow
                style={{
                    shadowColor: theme.background,
                    shadowRadius: 2,
                    shadowOpacity: 1,
                    shadowOffset: { height: -5, width: 0 },
                }}
            />
        </GrowContainer>
    );
};

export default ManageScreen;
