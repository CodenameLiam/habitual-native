import { useEffect, useState } from 'react';
import { getValue, storeValue } from './StorageController';

export type ThemeType = 'dark' | 'light';

const THEME_KEY = '@Theme';
const DEFAULT_THEME: ThemeType = 'light';

interface IThemeController {
    loadingTheme: boolean;
    darkTheme: boolean;
    updateTheme: (theme: ThemeType) => void;
}

export const useTheme = (): IThemeController => {
    // Store state
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const [loadingTheme, setLoading] = useState<boolean>(true);

    // Updates the value in local storage
    const updateTheme = (theme: ThemeType): void => {
        setDarkTheme(theme === 'dark');
        storeValue(THEME_KEY, theme);
    };

    // Run on first mount to get theme from local storage
    useEffect(() => {
        const configureTheme = async (): Promise<void> => {
            const theme = await getValue(THEME_KEY);
            if (!theme) {
                updateTheme(DEFAULT_THEME);
            } else {
                updateTheme(theme as ThemeType);
            }
            setLoading(false);
        };
        configureTheme();
    }, []);

    return { loadingTheme, darkTheme, updateTheme };
};
