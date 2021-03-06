import { DefaultTheme, Theme } from '@react-navigation/native';
import { ITheme, ThemeColours } from './Colours';

export const DarkTheme: ITheme = {
    text: ThemeColours.dark.text,
    grey: ThemeColours.dark.grey,
    background: ThemeColours.dark.background,
    card: ThemeColours.dark.card,
    disabled: ThemeColours.dark.disabled,
};

export const LightTheme: ITheme = {
    text: ThemeColours.light.text,
    grey: ThemeColours.light.grey,
    background: ThemeColours.light.background,
    card: ThemeColours.light.card,
    disabled: ThemeColours.light.disabled,
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
