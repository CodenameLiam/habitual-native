import ColourPicker from 'Components/ColourPicker/ColourPicker';
import { useColour, useTheme } from 'Context/AppContext';
import { useTheme as useEmotion } from '@emotion/react';
import React, { FC, useRef } from 'react';
import { SafeAreaView, Switch, Text, View } from 'react-native';
import { BodyFont, headerFont } from 'Styles/Fonts';
import {
    SettingsCard,
    SettingsDrawerContainer,
    SettingsDrawerShadow,
    SettingsHeader,
    SettingsRow,
} from './SettingsDrawer.styles';
import BottomSheet from 'reanimated-bottom-sheet';
import Card from 'Components/Card/Card';
import { Colour } from 'Types/Colour.types';

const CustomColourOrder: Colour[] = [
    'MIDNIGHT',
    'PURPLE',
    'PINK',
    'RED',
    'LIME',
    'YELLOW',
    'TANGERINE',
    'ORANGE',
    'GREEN',
    'AQUA',
    'SKY',
    'BLUE',
];

const SettingsDrawer: FC = () => {
    const emotion = useEmotion();
    const [theme, dispatchTheme] = useTheme();
    const [, dispatchColour] = useColour();
    const dark = theme === 'DARK';

    return (
        <SettingsDrawerContainer>
            <SettingsDrawerShadow style={{ shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.3 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <SettingsHeader>
                    <Text style={[headerFont, { color: emotion.text }]}>Settings</Text>
                </SettingsHeader>
                <SettingsRow>
                    <BodyFont>Dark Theme</BodyFont>
                    <Switch value={dark} onValueChange={() => dispatchTheme(dark ? 'LIGHT' : 'DARK')} />
                </SettingsRow>
                <SettingsCard title="Favourite Colour" textStyle={{ color: emotion.text, fontSize: 18 }}>
                    <ColourPicker
                        updateGradient={gradient => dispatchColour(gradient)}
                        customOrder={CustomColourOrder}
                    />
                </SettingsCard>
            </SafeAreaView>
        </SettingsDrawerContainer>
    );
};

export default SettingsDrawer;
