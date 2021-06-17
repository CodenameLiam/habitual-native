import { Categories } from 'Components/Category/Category.constants';
import CategoryHabit from 'Components/Category/CategoryHabit';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import { HabitScroll } from 'Components/Habit/Habit.styles';
import { CategoryNavProps, CategoryRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React from 'react';

interface CategoryScreenProps {
    navigation: CategoryNavProps;
    route: CategoryRouteProps;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
    const category = Categories[route.params.category];

    return (
        <DismissableScrollView navigation={navigation} contentContainerStyle={HabitScroll}>
            {category.habits.map(habit => (
                <CategoryHabit key={habit.name} habit={habit} />
            ))}
        </DismissableScrollView>
    );
};

export default CategoryScreen;
