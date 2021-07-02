import styled from '@emotion/native';
import Icon from 'Components/Icon';
import { TouchableOpacity } from 'react-native';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

interface CategoryProps {
    colour: string;
}

export const CategoryButton = styled(TouchableOpacity)<CategoryProps>`
    margin-bottom: 15px;
    border-radius: 5px;
    height: 100px;
    width: 48%;
    padding: 10px;
    position: relative;
    overflow: hidden;
    background-color: ${props => props.colour};
`;

export const CategoryText = styled.Text`
    font-size: 16px;
    font-family: ${fontFamily};
    color: ${props => props.theme.background};
`;

export const CategorySubText = styled.Text<CategoryProps>`
    font-size: 12px;
    font-family: ${fontFamily};
    color: ${props => props.colour};
`;

export const CategoryIcon = styled(Icon)`
    position: absolute;
    right: -42px;
    bottom: -32px;
`;

export const CategoryHabitContainer = styled.View`
    height: 70px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    margin: 5px;
    background-color: ${props => props.theme.card};
`;

export const CategoryHabitText = styled.Text`
    font-family: ${fontFamily};
    font-size: 16px;
    color: ${props => props.theme.text};
`;
