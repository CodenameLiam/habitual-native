import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

interface BuildRoute {
    id?: string;
}

export type AppParamList = {
    Tabs: undefined;
    Build: BuildRoute;
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
export type BuildNavProps = StackNavigationProp<AppParamList, 'Build'>;
export type BuildRouteProps = RouteProp<AppParamList, 'Build'>;
