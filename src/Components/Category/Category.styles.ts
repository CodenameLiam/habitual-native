import styled from '@emotion/native';
import Icon from 'Components/Icon';
import { TouchableOpacity } from 'react-native';

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
    font-weight: 600;
    font-family: 'Montserrat';
    color: ${props => props.theme.background};
`;

export const CategoryIcon = styled(Icon)`
    position: absolute;
    right: -35px;
    bottom: -25px;
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
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    color: ${props => props.theme.text};
`;
