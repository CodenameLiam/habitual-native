import ColourPicker from 'Components/ColourPicker/ColourPicker';
import { useColour, useTheme } from 'Context/AppContext';
import { useTheme as useEmotion } from '@emotion/react';
import React, { FC } from 'react';
import { Linking, SafeAreaView, Switch, Text, TouchableOpacity } from 'react-native';
import { BodyFont, headerFont } from 'Styles/Fonts';
import {
    SettingsCard,
    SettingsDrawerContainer,
    SettingsDrawerShadow,
    SettingsHeader,
    SettingsRow,
} from './SettingsDrawer.styles';
import { Colour } from 'Types/Colour.types';
import GrowScrollView from 'Components/GrowScrollView/GrowScrollView';
import Icon from 'Components/Icon';

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
    // Current theme
    const emotion = useEmotion();

    // State dispatch
    const [theme, dispatchTheme] = useTheme();
    const [, dispatchColour] = useColour();
    const dark = theme === 'DARK';

    const handleOpen = async (url: string): Promise<void> => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            console.error("Don't know how to open URI: " + url);
        }
    };

    return (
        <SettingsDrawerContainer>
            <SettingsDrawerShadow style={{ shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.3 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <SettingsHeader>
                    <Text style={[headerFont, { color: emotion.text }]}>Settings</Text>
                </SettingsHeader>
                <GrowScrollView>
                    <SettingsRow>
                        <BodyFont>Dark Theme</BodyFont>
                        <Switch value={dark} onValueChange={() => dispatchTheme(dark ? 'LIGHT' : 'DARK')} />
                    </SettingsRow>
                    {/* <TouchableOpacity>
                        <SettingsRow>
                            <BodyFont>Manage Habits</BodyFont>
                            <Icon family="fontawesome" name="cog" size={24} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity> */}
                    <SettingsCard title="Favourite Colour" textStyle={{ color: emotion.text, fontSize: 18 }}>
                        <ColourPicker
                            updateGradient={gradient => dispatchColour(gradient)}
                            customOrder={CustomColourOrder}
                        />
                    </SettingsCard>
                    <TouchableOpacity onPress={() => handleOpen('https://www.liampercy.com')}>
                        <SettingsRow>
                            <BodyFont>Rate App</BodyFont>
                            <Icon family="fontawesome" name="star" size={24} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SettingsRow>
                            <BodyFont>Vote on Features</BodyFont>
                            <Icon family="fontawesome" name="thumbs-up" size={24} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SettingsRow>
                            <BodyFont>Support</BodyFont>
                            <Icon family="fontawesome" name="support" size={24} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <SettingsRow>
                            <BodyFont>Legal</BodyFont>
                            <Icon family="fontawesome" name="legal" size={24} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity> */}
                </GrowScrollView>
            </SafeAreaView>
        </SettingsDrawerContainer>
    );
};

export default SettingsDrawer;
