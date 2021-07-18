import React from 'react';
import styled from '@emotion/native';
import { Gradients } from 'Styles/Colours';
import { Theme } from '@emotion/react';
import { PaperOnboardingItemType } from '@gorhom/paper-onboarding';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import OnboardingTheme from './OnboardingTheme/OnboardingTheme';
import OnboardingHabit from './OnboardingHabit/OnboardingHabit';

const OnboardingImage = styled.Image`
    height: ${heightPercentageToDP(40) + 'px'};
    width: ${heightPercentageToDP(24) + 'px'};
    border-radius: ${heightPercentageToDP(2) + 'px'};
`;

const OnboardingData = (theme: Theme): PaperOnboardingItemType[] => [
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
        content: OnboardingTheme,
        backgroundColor: theme.background,
        showCloseButton: true,
    },
    {
        content: OnboardingHabit,
        backgroundColor: theme.background,
        showCloseButton: true,
    },
];

export default OnboardingData;
