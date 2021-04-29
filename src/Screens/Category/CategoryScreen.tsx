import { CategoryNavProps, CategoryRouteProps } from 'Navigation/Params';
import React from 'react';
import { View, Text } from 'react-native';

interface CategoryScreenProps {
    navigation: CategoryNavProps;
    route: CategoryRouteProps;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
    console.log(route.params.category);
    return (
        <View>
            <Text>Cat</Text>
        </View>
    );
};

export default CategoryScreen;
