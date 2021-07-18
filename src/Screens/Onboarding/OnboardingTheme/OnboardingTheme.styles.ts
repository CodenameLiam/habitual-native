import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';

export const Title = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(3) + 'px'};
    margin-top: 60px;
    color: ${props => props.theme.text};
`;

export const SubTitle = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    margin-top: 15px;
    text-align: center;
    padding: 0px 20px;
    padding-bottom: 70px;
    color: ${props => props.theme.text};
`;

export const ThemeImage = styled.Image`
    height: ${heightPercentageToDP(25) + 'px'};
    width: ${heightPercentageToDP(15) + 'px'};
    border-radius: 15px;
`;

interface ThemeTouchProps {
    active?: boolean;
}
export const ThemeTouch = styled.TouchableOpacity<ThemeTouchProps>`
    margin-top: 60px;
    padding: 3px;
    border-radius: 20px;
    border: 3px solid ${props => (props.active ? Gradients.GREEN.start : props.theme.background)};
`;
