import { useTheme } from '@emotion/react';
import { GrowContainer, GrowScrollContent, GrowShadow } from 'Components/GrowScrollView/GrowScrollView.styles';
import { HabitContainer, HabitText, HabitTextContainer } from 'Components/Habit/Habit.styles';
import { useHabits } from 'Context/AppContext';
import { ManageNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React, { FC, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';
import { BodyFont } from 'Styles/Fonts';
import { HabitObject } from 'Types/Habit.types';
import * as Styled from './ManageScreen.styles';

interface ManageScreenProps {
    navigation: ManageNavProps;
}

const ManageScreen: FC<ManageScreenProps> = ({ navigation }) => {
    // const [data, setData] = useState(exampleData);

    const theme = useTheme();

    const [habits, dispatchHabits] = useHabits();
    const [data, setData] = useState(Object.values(habits));

    const handleDragEnd = (params: DragEndParams<HabitObject>): void => {
        console.log(params.from);
        console.log(params.to);
        setData(params.data);
        navigation.setOptions({ gestureEnabled: true });
    };

    const renderItem = useCallback(({ item, index, drag, isActive }: RenderItemParams<HabitObject>) => {
        const handlePress = (): void => {
            navigation.setOptions({ gestureEnabled: false });
            drag();
        };

        return (
            <HabitContainer>
                <Styled.Draggable
                    style={{ backgroundColor: isActive ? 'green' : 'red' }}
                    onPressIn={handlePress}
                ></Styled.Draggable>
                <HabitTextContainer>
                    <HabitText
                        scroll={false}
                        animationType="bounce"
                        duration={3000}
                        bounceDelay={1500}
                        marqueeDelay={1000}
                        bouncePadding={{ left: 0, right: 0 }}
                    >
                        {item.name}
                    </HabitText>
                </HabitTextContainer>
            </HabitContainer>
        );
    }, []);

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
