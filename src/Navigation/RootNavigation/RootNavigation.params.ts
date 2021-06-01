import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootParamsList = {
    Settings: undefined;
    App: undefined;
};

// Settings Navigation Types
export type AppNavProps = DrawerNavigationProp<RootParamsList, 'App'>;
