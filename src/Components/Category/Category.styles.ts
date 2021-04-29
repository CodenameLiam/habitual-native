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
    /* background-color: green; */
    /* background-color: ${props => props.colour}; */
    background-color: ${props => props.colour};
    width: 48%;
    padding: 10px;
    position: relative;
    overflow: hidden;
`;

export const CategoryText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    font-family: 'Montserrat';
    color: ${props => props.theme.background};
`;

export const CategoryIcon = styled(Icon)`
    position: absolute;
    right: -42px;
    bottom: -30px;
`;
