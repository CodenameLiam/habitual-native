import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryType } from 'Components/Category/Category.constants';
import { IconProps } from 'Components/Icon';
import { IColours } from 'Styles/Colours';

interface BuildRoute {
    id?: string;
    icon?: Partial<IconProps>;
    colour?: IColours;
}

interface CategoryParams {
    category: CategoryType;
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
    Category: CategoryParams;
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
export type IconNavProps = StackNavigationProp<AppParamList, 'Icon'>;
export type IdeaNavProps = StackNavigationProp<AppParamList, 'Ideas'>;
export type ViewNavProps = StackNavigationProp<AppParamList, 'View'>;
export type ViewRouteProps = RouteProp<AppParamList, 'View'>;
export type BuildNavProps = StackNavigationProp<AppParamList, 'Build'>;
export type BuildRouteProps = RouteProp<AppParamList, 'Build'>;
export type CategoryNavProps = StackNavigationProp<AppParamList, 'Category'>;
export type CategoryRouteProps = RouteProp<AppParamList, 'Category'>;

// Tab Navigation Types
export type HomeRouteProps = RouteProp<TabParamList, 'Home'>;
