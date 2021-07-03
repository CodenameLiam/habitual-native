import { StackActions, useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import PaperOnboarding, { PaperOnboardingItemType } from '@gorhom/paper-onboarding';
import { Gradients, ThemeColours } from 'Styles/Colours';
import { OnboardingNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { fontFamily } from 'Styles/Fonts';
import OnboardingHabit from './OnboardingHabit';
import { useOnboarded } from 'Context/AppContext';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import styled from '@emotion/native';
import { Platform } from 'react-native';

const OnboardingImage = styled.Image`
    height: 300px;
    width: 180px;
    border-radius: 15px;
`;

const data: PaperOnboardingItemType[] = [
    {
        title: 'Be the best you.',
        description:
            'Habitual helps you to focus on what truly matters. Build the best version of yourself by mastering habits that are important to you.',
        backgroundColor: Gradients.PURPLE.solid,
        showCloseButton: true,
        image: () => <OnboardingImage resizeMode="contain" source={require('assets/images/Best.png')} />,
    },
    {
        title: 'Track your development.',
        description:
            'View detailed reports as you progress on your habit tracking journey. Challenge yourself to set higher streaks, and work towards achieving your goals.',
        backgroundColor: Gradients.GREEN.start,
        showCloseButton: true,
        image: () => <OnboardingImage resizeMode="contain" source={require('assets/images/Development.png')} />,
    },
    {
        title: 'Stay accountable.',
        description:
            "Never forget to complete a habit with reminders to nudge yourself in the right direction and keep you motivated. You've got this!",
        backgroundColor: Gradients.TANGERINE.solid,
        showCloseButton: true,
        image: () => <OnboardingImage resizeMode="contain" source={require('assets/images/Accountable.png')} />,
    },
    {
        content: OnboardingHabit,
        backgroundColor: ThemeColours.dark.background,
        showCloseButton: true,
    },
];

const Onboarding: FC = () => {
    const navigation = useNavigation<OnboardingNavProps>();
    const [, dispatchOnboarded] = useOnboarded();

    const handleOnClosePress = (): void => {
        ReactNativeHapticFeedback.trigger('impactMedium');
        dispatchOnboarded(true);
        navigation.dispatch(StackActions.replace('Tabs'));
    };

    return (
        <PaperOnboarding
            data={data}
            onCloseButtonPress={handleOnClosePress}
            indicatorSize={20}
            // indicatorBorderColor={ThemeColours.dark.card}
            // indicatorBackgroundColor={ThemeColours.dark.card}
            safeInsets={{ top: 50, bottom: 50, left: 0, right: 0 }}
            titleStyle={{
                fontFamily: fontFamily,
                fontSize: Platform.OS === 'ios' ? 30 : 26,
                fontWeight: '600',
                marginTop: -50,
                // color: ThemeColours.dark.card
            }}
            descriptionStyle={{
                fontFamily: fontFamily,
                fontWeight: '600',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
                // color: ThemeColours.dark.card,
            }}
            closeButtonText="Skip"
            closeButtonTextStyle={{ fontFamily: fontFamily }}
        />
    );
};

export default Onboarding;
