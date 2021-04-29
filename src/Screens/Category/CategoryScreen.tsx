import { Categories } from 'Components/Category/Category.constants';
import { HabitScroll } from 'Components/Habit/Habit.styles';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import { AppContext } from 'Context/AppContext';
import { CategoryNavProps, CategoryRouteProps } from 'Navigation/Params';
import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GradientColours } from 'Styles/Colours';

interface CategoryScreenProps {
    navigation: CategoryNavProps;
    route: CategoryRouteProps;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
    const { habits } = useContext(AppContext);
    const category = Categories[route.params.category];

    return (
        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={HabitScroll} showsVerticalScrollIndicator={false}>
            {category.habits?.map(habit => (
                <Text key={habit.name}>{habit.name}</Text>
            ))}
        </ScrollView>
    );
};

export default CategoryScreen;
