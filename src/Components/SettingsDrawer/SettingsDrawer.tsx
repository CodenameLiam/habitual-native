import ColourPicker from 'Components/ColourPicker/ColourPicker';
import { useColour, useTheme } from 'Context/AppContext';
import { useTheme as useEmotion } from '@emotion/react';
import React, { FC } from 'react';
import { Dimensions, Linking, SafeAreaView, Switch, Text, TouchableOpacity } from 'react-native';
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
import { Gradients, GreyColours } from 'Styles/Colours';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Rate from 'react-native-rate';
import { isTablet } from 'Helpers/Size';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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

const IconSize = heightPercentageToDP(2.8);

interface SettingsDrawerProps {
    navigation: DrawerNavigationHelpers;
}

const SettingsDrawer: FC<SettingsDrawerProps> = ({ navigation }) => {
    // Current theme
    const emotion = useEmotion();

    // State dispatch
    const [theme, dispatchTheme] = useTheme();
    const [colour, dispatchColour] = useColour();
    const dark = theme === 'DARK';

    const handleOpen = async (url: string): Promise<void> => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            console.error("Don't know how to open URI: " + url);
        }
    };

    const handleManage = (): void => {
        ReactNativeHapticFeedback.trigger('impactLight');
        navigation.navigate('App', { screen: 'Manage' });
    };

    return (
        <SettingsDrawerContainer>
            <SettingsDrawerShadow style={{ shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.3 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <SettingsHeader>
                    <Text style={[headerFont, { color: emotion.text }]}>Settings</Text>
                </SettingsHeader>
                <GrowScrollView>
                    <TouchableOpacity onPress={handleManage}>
                        <SettingsRow>
                            <BodyFont>Manage Habits</BodyFont>
                            <Icon family="fontawesome" name="cog" size={IconSize} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    <SettingsRow>
                        <BodyFont>Dark Theme</BodyFont>
                        <Switch
                            trackColor={{ false: GreyColours.GREY1, true: Gradients[colour].solid }}
                            thumbColor={GreyColours.GREY0}
                            value={dark}
                            onValueChange={() => dispatchTheme(dark ? 'LIGHT' : 'DARK')}
                        />
                    </SettingsRow>
                    <SettingsCard title="Favourite Colour" textStyle={{ color: emotion.text }}>
                        <ColourPicker
                            updateGradient={gradient => dispatchColour(gradient)}
                            customOrder={isTablet() ? undefined : CustomColourOrder}
                            size={isTablet() ? widthPercentageToDP(10) + 'px' : undefined}
                        />
                    </SettingsCard>

                    <TouchableOpacity
                        onPress={() =>
                            Rate.rate(
                                {
                                    AppleAppID: '2193813192',
                                    GooglePackageName: 'com.mywebsite.myapp',
                                    preferInApp: true,
                                },
                                success => console.log('App rating was ' + success ? 'successful' : 'unsuccessful'),
                            )
                        }
                    >
                        <SettingsRow>
                            <BodyFont>Rate App</BodyFont>
                            <Icon family="fontawesome" name="star" size={IconSize} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpen('https://www.gethabitual.app#features')}>
                        <SettingsRow>
                            <BodyFont>Vote on Features</BodyFont>
                            <Icon family="fontawesome" name="thumbs-up" size={IconSize} colour={emotion.text} />
                        </SettingsRow>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOpen('https://www.gethabitual.app#support')}>
                        <SettingsRow>
                            <BodyFont>Support</BodyFont>
                            <Icon family="fontawesome" name="support" size={IconSize} colour={emotion.text} />
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
