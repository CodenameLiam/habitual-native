import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeRouteProps } from 'Navigation/Params';

export const getHeaderTitle = (route: HomeRouteProps): string => {
    return getFocusedRouteNameFromRoute(route) ?? 'Home';
};
