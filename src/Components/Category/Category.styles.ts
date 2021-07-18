import styled from '@emotion/native';
import Icon from 'Components/Icon';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily, fontFamilyBold } from 'Styles/Fonts';

interface CategoryProps {
    colour: string;
}

export const CategoryButton = styled(TouchableOpacity)<CategoryProps>`
    margin-bottom: ${heightPercentageToDP(2) + 'px'};
    border-radius: 5px;
    height: ${heightPercentageToDP(12) + 'px'};
    width: 48%;
    padding: ${heightPercentageToDP(1) + 'px'};
    position: relative;
    overflow: hidden;
    background-color: ${props => props.colour};
`;

export const CategoryText = styled.Text`
    font-size: ${heightPercentageToDP(1.8) + 'px'};
    font-family: ${fontFamilyBold};
    color: ${props => props.theme.background};
`;

export const CategorySubText = styled.Text<CategoryProps>`
    font-size: ${heightPercentageToDP(1.3) + 'px'};
    font-family: ${fontFamily};
    color: ${props => props.colour};
`;

export const CategoryIcon = styled(Icon)`
    position: absolute;
    right: -${heightPercentageToDP(4) + 'px'};
    bottom: -${heightPercentageToDP(3) + 'px'};
`;

export const CategoryHabitContainer = styled.View`
    height: ${heightPercentageToDP(8.5) + 'px'};
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
    font-size: ${heightPercentageToDP(1.8) + 'px'};
    color: ${props => props.theme.text};
`;
