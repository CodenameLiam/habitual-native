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

export type TabNavProps = StackNavigationProp<AppParamList, 'Tabs'>;
