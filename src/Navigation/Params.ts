import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconProps } from 'Components/Icon';
import { IHabit } from 'Controllers/HabitController/HabitController';

interface BuildRoute {
    id?: string;
    icon?: Partial<IconProps>;
}

export type AppParamList = {
    Tabs: undefined;
    Build: BuildRoute;
    Icon: undefined;
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

// Settings Navigation Types
export type AppNavProps = DrawerNavigationProp<SettingsParamList, 'App'>;

// App Navigation Types
export type TabNavProps = StackNavigationProp<AppParamList, 'Tabs'>;
export type BuildNavProps = StackNavigationProp<AppParamList, 'Build'>;
export type BuildRouteProps = RouteProp<AppParamList, 'Build'>;
export type IconNavProps = StackNavigationProp<AppParamList, 'Icon'>;
