import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryType } from 'Components/Category/Category.constants';
import { IWeeklyTotalArray } from 'Components/TrendButton/TrendButton.functions';
import { Colour } from 'Types/Colour.types';

interface BuildRoute {
    id?: string;
    colour?: Colour;
}
interface ViewRoute {
    id: string;
    name: string;
    colour: Colour;
    dateIndex: number;
}
interface CategoryRoute {
    category: CategoryType;
}

interface StatsRoute {
    id: string;
    name: string;
    colour: Colour;
    weeklyTotalArray: IWeeklyTotalArray;
    threeMonthAverage: number;
    yearAverage: number;
}

export type AppParamList = {
    Tabs: undefined;
    Build: BuildRoute;
    View: ViewRoute;
    Icon: undefined;
    Ideas: undefined;
    Stats: StatsRoute;
    Category: CategoryRoute;
    Onboarding: undefined;
};

// App Navigation Types
export type TabNavProps = StackNavigationProp<AppParamList, 'Tabs'>;
export type IdeaNavProps = StackNavigationProp<AppParamList, 'Ideas'>;
export type ViewNavProps = StackNavigationProp<AppParamList, 'View'>;
export type ViewRouteProps = RouteProp<AppParamList, 'View'>;
export type StatsNavProps = StackNavigationProp<AppParamList, 'Stats'>;
export type StatsRouteProps = RouteProp<AppParamList, 'Stats'>;
export type BuildNavProps = StackNavigationProp<AppParamList, 'Build'>;
export type BuildRouteProps = RouteProp<AppParamList, 'Build'>;
export type CategoryNavProps = StackNavigationProp<AppParamList, 'Category'>;
export type CategoryRouteProps = RouteProp<AppParamList, 'Category'>;
export type OnboardingNavProps = StackNavigationProp<AppParamList, 'Onboarding'>;
