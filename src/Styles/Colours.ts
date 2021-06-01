import { Colour } from 'Types/Colour.types';

export interface ITheme {
    text: string;
    background: string;
    card: string;
    grey: string;
    disabled: string;
}

interface IThemeColours {
    dark: ITheme;
    light: ITheme;
}

export const ThemeColours: IThemeColours = {
    dark: {
        text: '#FFFFFF',
        background: '#0F2028',
        card: '#223843',
        grey: '#c5c5c5',
        disabled: '#2c424d',
    },
    light: {
        text: '#0F2028',
        background: '#f4f4f4',
        card: '#fff',
        grey: '#c5c5c5',
        disabled: '#c5c5c5',
    },
};

export const GreyColours = {
    GREY0: '#f4f4f4',
    GREY1: '#dddddd',
    GREY2: '#c5c5c5',
    GREY3: '#989898',
    GREY4: '#6f6f6f',
    GREY5: '#474747',
    GREY6: '#222222',
};

export interface IGradient {
    start: string;
    end: string;
    solid: string;
}

export const GradientColours: { [key in Colour]: IGradient } = {
    MIDNIGHT: {
        start: '#8f79f8',
        end: '#bf7df3',
        solid: '#9268f5',
    },
    PURPLE: {
        start: '#C373F2',
        end: '#F977CE',
        solid: '#C373F2',
    },
    PINK: {
        start: '#F1A7F1',
        end: '#f876de',
        solid: '#f876de',
    },

    SKY: {
        start: '#83EAF1',
        end: '#63A4FF',
        solid: '#63c6ff',
    },
    AQUA: {
        start: '#39E5B6',
        end: '#0499F2',
        solid: '#2de5c9',
    },
    BLUE: {
        start: '#09C6F9',
        end: '#045DE9',
        solid: '#0a94f0',
    },
    RED: {
        start: '#fe4d6a',
        end: '#fd5e96',
        solid: '#fd5785',
    },
    ORANGE: {
        start: '#FF748B',
        end: '#FE7BB0',
        solid: '#FF748B',
    },
    TANGERINE: {
        start: '#FB7BA2',
        end: '#f7dc6e',
        solid: '#F9AC88',
    },
    YELLOW: {
        start: '#fbbf60',
        end: '#fde293',
        solid: '#ffd269',
    },
    LIME: {
        start: '#35e678',
        end: '#cef576',
        solid: '#5dfc98',
    },
    GREEN: {
        start: '#49d7b4',
        end: '#1cfdab',
        solid: '#33EAB0',
    },
};

export const TabColours = {
    HOME: GradientColours.TANGERINE.solid,
    CALENDAR: GradientColours.RED.solid,
    TRENDS: GradientColours.AQUA.solid,
    AWARDS: GradientColours.PURPLE.solid,
};
