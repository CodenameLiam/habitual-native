import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootParamsList = {
    App: undefined;
    Settings: undefined;
    Onboarding: undefined;
};

// Settings Navigation Types
export type AppNavProps = DrawerNavigationProp<RootParamsList, 'App'>;
export type OnboardingNavProps = DrawerNavigationProp<RootParamsList, 'Onboarding'>;
