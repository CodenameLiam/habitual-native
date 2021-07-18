import { useTheme } from '@emotion/react';
import { IdeaNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
import { CategoryObject } from './Category.constants';
import { CategoryButton, CategoryIcon, CategoryText } from './Category.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface CategoryProps {
    category: CategoryObject;
    navigation: IdeaNavProps;
}

const Category: React.FC<CategoryProps> = ({ navigation, category }) => {
    const theme = useTheme();

    const { id, name, colour, icon } = category;
    const solid = Gradients[colour].solid;

    const handlePress = (): void => {
        navigation.navigate('Category', { category: id });
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <CategoryButton colour={solid} onPress={handlePress}>
            <LinearGradient
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[Gradients[colour].start, Gradients[colour].end]}
            />
            <CategoryText>{name}</CategoryText>
            <CategoryIcon
                family={icon.family}
                name={icon.name}
                size={heightPercentageToDP(14)}
                colour={theme.background}
            />
        </CategoryButton>
    );
};

export default Category;
