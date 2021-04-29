import { useTheme } from '@emotion/react';
import { IdeaNavProps } from 'Navigation/Params';
import React from 'react';
import { GradientColours } from 'Styles/Colours';
import { ICategory } from './Category.constants';
import { CategoryButton, CategoryIcon, CategoryText } from './Category.styles';

interface CategoryProps {
    category: ICategory;
    navigation: IdeaNavProps;
}

const Category: React.FC<CategoryProps> = ({ navigation, category }) => {
    const theme = useTheme();

    const { id, name, colour, icon } = category;
    const solid = GradientColours[colour].solid;

    return (
        <CategoryButton colour={solid} onPress={() => navigation.navigate('Category', { category: id })}>
            <CategoryText>{name}</CategoryText>
            <CategoryIcon family={icon.family} name={icon.name} size={120} colour={theme.background} />
        </CategoryButton>
    );
};

export default Category;
