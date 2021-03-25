export interface ITheme {
    text: string;
    background: string;
    card: string;
    grey: string;
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
    },
    light: {
        text: '#0F2028',
        background: '#f4f4f4',
        card: '#fff',
        grey: '#989898',
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

export type IColours =
    | 'MIDNIGHT'
    | 'PURPLE'
    | 'RED'
    | 'ORANGE'
    | 'TANGERINE'
    | 'YELLOW'
    | 'BLUE'
    | 'SKY'
    | 'AQUA'
    | 'GREEN'
    | 'LIME'
    | 'PINK';

export interface IGradient {
    start: string;
    end: string;
    solid: string;
}

export const GradientColours: { [key in IColours]: IGradient } = {
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
        solid: '#fbbf60',
    },
    BLUE: {
        start: '#09C6F9',
        end: '#045DE9',
        solid: '#0a94f0',
    },
    SKY: {
        start: '#83EAF1',
        end: '#63A4FF',
        solid: '#63A4FF',
    },
    AQUA: {
        start: '#39E5B6',
        end: '#0499F2',
        solid: '#2de5c9',
    },
    GREEN: {
        start: '#49d7b4',
        end: '#1cfdab',
        solid: '#33EAB0',
    },
    LIME: {
        start: '#1cfdab',
        end: '#CEF576',
        solid: '#57FA99',
    },
    PINK: {
        start: '#F1A7F1',
        end: '#FAD0C4',
        solid: '#F1A7F1',
    },
};

export const TabColours = {
    HOME: GradientColours.TANGERINE.solid,
    CALENDAR: GradientColours.RED.solid,
    TRENDS: GradientColours.AQUA.solid,
    AWARDS: GradientColours.PURPLE.solid,
};
