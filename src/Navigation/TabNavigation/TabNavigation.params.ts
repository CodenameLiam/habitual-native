import { RouteProp } from '@react-navigation/native';

export type TabParamList = {
    Home: undefined;
    Calendar: undefined;
    Trends: undefined;
    Awards: undefined;
};

// Tab Navigation Types
export type HomeRouteProps = RouteProp<TabParamList, 'Home'>;
