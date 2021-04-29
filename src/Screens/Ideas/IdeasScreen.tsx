import Category from 'Components/Category/Category';
import { Categories } from 'Components/Category/Category.constants';
import { IdeaNavProps } from 'Navigation/Params';
import React from 'react';
import { CategoryContainer } from './IdeasScreen.styles';

interface IdeaScreenProps {
    navigation: IdeaNavProps;
}

const IdeasScreen: React.FC<IdeaScreenProps> = ({ navigation }) => {
    return (
        <CategoryContainer>
            {Object.values(Categories).map(category => (
                <Category key={category.id} navigation={navigation} category={category} />
            ))}
        </CategoryContainer>
    );
};

export default IdeasScreen;
