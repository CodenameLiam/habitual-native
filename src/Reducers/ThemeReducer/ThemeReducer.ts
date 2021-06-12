import { storeValue } from 'Controllers/StorageController';
import { THEME_KEY } from 'Hooks/useStorage';
import { Theme } from 'Types/Theme.types';

const themeReducer = (state: Theme, action: Theme): Theme => {
    storeValue(THEME_KEY, action);
    return action;
};

export default themeReducer;
