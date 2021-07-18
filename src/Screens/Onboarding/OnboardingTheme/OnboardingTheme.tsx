import styled from '@emotion/native';
import { useTheme } from 'Context/AppContext';
import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
import { Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';
import { FullCenter, RowBetween } from 'Styles/Globals';
import * as Styles from './OnboardingTheme.styles';

const OnboardingTheme: FC = () => {
    const [theme, dispatchTheme] = useTheme();

    return (
        <View style={[FullCenter, { width: Dimensions.get('screen').width - 40 }]}>
            <View style={RowBetween}>
                <Styles.ThemeTouch
                    onPress={() => dispatchTheme('LIGHT')}
                    style={{ marginRight: 10 }}
                    active={theme === 'LIGHT'}
                >
                    <Styles.ThemeImage resizeMode="contain" source={require('assets/images/Light.png')} />
                </Styles.ThemeTouch>
                <Styles.ThemeTouch onPress={() => dispatchTheme('DARK')} active={theme === 'DARK'}>
                    <Styles.ThemeImage resizeMode="contain" source={require('assets/images/Dark.png')} />
                </Styles.ThemeTouch>
            </View>
            <Styles.Title>Select your theme.</Styles.Title>
            <Styles.SubTitle>
                Customise your experience by selecting one of the themes above. Will you join the light side or the dark
                side?
            </Styles.SubTitle>
        </View>
    );
};

export default OnboardingTheme;
