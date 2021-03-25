import React, { useEffect, useRef, useState } from 'react';
import { getValue, storeValue } from './StorageController';

export type ThemeType = 'dark' | 'light';

const THEME_KEY = '@Theme';
const DEFAULT_THEME: ThemeType = 'light';

interface IUseTheme {
    loadingTheme: boolean;
    darkTheme: boolean | undefined;
    setTheme: (theme: ThemeType) => void;
}

export const useTheme = (): IUseTheme => {
    // Store state
    const [darkTheme, setDarkTheme] = useState<boolean>();
    const [loadingTheme, setLoading] = useState<boolean>(true);

    // Updates the value in local storage
    const setTheme = (theme: ThemeType): void => {
        setDarkTheme(theme === 'dark');
        storeValue(THEME_KEY, theme);
    };

    // Run on first mount to get theme from local storage
    useEffect(() => {
        const configureTheme = async (): Promise<void> => {
            const theme = await getValue(THEME_KEY);
            if (!theme) {
                setTheme(DEFAULT_THEME);
            } else {
                setTheme(theme as ThemeType);
            }
            setLoading(false);
        };
        configureTheme();
    }, []);

    return { loadingTheme, darkTheme, setTheme };
};
