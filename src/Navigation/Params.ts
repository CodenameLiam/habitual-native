import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconProps } from 'Components/Icon';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { IColours } from 'Styles/Colours';

interface BuildRoute {
    id?: string;
    icon?: Partial<IconProps>;
    colour?: IColours;
}

interface ViewRoute {
    id: string;
    colour: IColours;
    name: string;
    prevIndex: number;
}

export type AppParamList = {
    Tabs: undefined;
    Build: BuildRoute;
    View: ViewRoute;
    Icon: undefined;
    Ideas: undefined;
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
export type ViewNavProps = StackNavigationProp<AppParamList, 'View'>;
export type ViewRouteProps = RouteProp<AppParamList, 'View'>;
export type IconNavProps = StackNavigationProp<AppParamList, 'Icon'>;
