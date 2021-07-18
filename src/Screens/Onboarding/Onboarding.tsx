import { StackActions, useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import PaperOnboarding from '@gorhom/paper-onboarding';
import { OnboardingNavProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { fontFamily } from 'Styles/Fonts';
import { useOnboarded } from 'Context/AppContext';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '@emotion/react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import OnboardingData from './Onboarding.constants';

const Onboarding: FC = () => {
    /* Hooks */
    const theme = useTheme();
    const navigation = useNavigation<OnboardingNavProps>();
    const [, dispatchOnboarded] = useOnboarded();

    /* State */
    const [index, setIndex] = useState(0);

    /* Skip onboarding */
    const handleOnClosePress = (): void => {
        dispatchOnboarded(true);
        ReactNativeHapticFeedback.trigger('impactMedium');
        navigation.dispatch(StackActions.replace('Tabs'));
    };

    return (
        <PaperOnboarding
            data={OnboardingData(theme)}
            onCloseButtonPress={handleOnClosePress}
            indicatorSize={heightPercentageToDP(1.5)}
            indicatorBorderColor={index < 3 ? '#fff' : theme.text}
            indicatorBackgroundColor={index < 3 ? '#fff' : theme.text}
            safeInsets={{ top: 50, bottom: 50, left: 0, right: 0 }}
            titleStyle={{
                fontFamily: fontFamily,
                fontSize: heightPercentageToDP(3),
                fontWeight: '600',
                marginTop: -50,
            }}
            descriptionStyle={{
                fontFamily: fontFamily,
                fontWeight: '600',
                fontSize: heightPercentageToDP(2),
            }}
            closeButtonText="Skip"
            closeButtonTextStyle={{ fontFamily: fontFamily, color: index < 3 ? '#fff' : theme.text }}
            onIndexChange={(index: number) => setIndex(index)}
        />
    );
};

export default Onboarding;
