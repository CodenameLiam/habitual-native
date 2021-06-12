import { useTheme } from '@emotion/react';
import { IdeaNavProps } from 'Navigation/Params';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
import { ICategory } from './Category.constants';
import { CategoryButton, CategoryIcon, CategoryText } from './Category.styles';

interface CategoryProps {
    category: ICategory;
    navigation: IdeaNavProps;
}

const Category: React.FC<CategoryProps> = ({ navigation, category }) => {
    const theme = useTheme();

    const { id, name, colour, icon } = category;
    const solid = Gradients[colour].solid;

    return (
        <CategoryButton colour={solid} onPress={() => navigation.navigate('Category', { category: id })}>
            <LinearGradient
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[Gradients[colour].start, Gradients[colour].end]}
            />
            <CategoryText>{name}</CategoryText>
            <CategoryIcon family={icon.family} name={icon.name} size={120} colour={theme.background} />
        </CategoryButton>
    );
};

export default Category;
