import styled from '@emotion/native';
import { useTheme } from 'Context/AppContext';
import React, { FC } from 'react';
import { View, Text, Dimensions, Switch, TouchableOpacity } from 'react-native';
import { GreyColours, Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';
import { FullCenter, RowBetween, RowCenter } from 'Styles/Globals';

/* Styles */
export const Title = styled.Text`
    font-family: ${fontFamily};
    font-size: 30px;
    margin-top: 60px;
    color: ${props => props.theme.text};
`;

export const SubTitle = styled.Text`
    font-family: ${fontFamily};
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
    height: 80px;
    padding: 0px 10px;
    color: ${props => props.theme.text};
`;

const ThemeImage = styled.Image`
    height: 250px;
    width: 150px;
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

const OnboardingTheme: FC = () => {
    const [theme, dispatchTheme] = useTheme();

    return (
        <View style={[FullCenter, { width: Dimensions.get('screen').width - 40 }]}>
            <View style={RowBetween}>
                <ThemeTouch
                    onPress={() => dispatchTheme('LIGHT')}
                    style={{ marginRight: 10 }}
                    active={theme === 'LIGHT'}
                >
                    <ThemeImage resizeMode="contain" source={require('assets/images/Light.png')} />
                </ThemeTouch>
                <ThemeTouch onPress={() => dispatchTheme('DARK')} active={theme === 'DARK'}>
                    <ThemeImage resizeMode="contain" source={require('assets/images/Dark.png')} />
                </ThemeTouch>
            </View>
            <Title>Select your theme.</Title>
            <SubTitle>
                Customise your experience by selecting one of the themes above. Will you join the light side or the dark
                side?
            </SubTitle>
        </View>
    );
};

export default OnboardingTheme;
