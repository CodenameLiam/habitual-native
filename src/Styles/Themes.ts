import { DefaultTheme, Theme } from '@react-navigation/native';
import { ITheme, ThemeColours } from './Colours';

export const DarkTheme: ITheme = {
    text: ThemeColours.dark.text,
    background: ThemeColours.dark.background,
    card: ThemeColours.dark.card,
};

export const LightTheme: ITheme = {
    text: ThemeColours.light.text,
    background: ThemeColours.light.background,
    card: ThemeColours.light.card,
};

export const NavDarkTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...DarkTheme,
    },
};

export const NavLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...LightTheme,
    },
};

declare module '@emotion/react' {
    export interface Theme extends ITheme {}
}
