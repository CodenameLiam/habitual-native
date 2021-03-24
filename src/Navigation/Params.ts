import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppParamList = {
    Tabs: undefined;
    Create: undefined;
};

export type TabParamList = {
    Home: undefined;
    Calendar: undefined;
    Trends: undefined;
    Awards: undefined;
};

export type SettingsParamList = {
    Settings: undefined;
    App: undefined;
};

export type AppNavProps = DrawerNavigationProp<SettingsParamList, 'App'>;

export type TabNavProps = StackNavigationProp<AppParamList, 'Tabs'>;
export type CreateNavProps = StackNavigationProp<AppParamList, 'Create'>;
