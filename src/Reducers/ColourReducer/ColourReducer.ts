import { storeValue } from 'Controllers/StorageController';
import { COLOUR_KEY } from 'Hooks/useStorage';
import { Colour } from 'Types/Colour.types';

const colourReducer = (state: Colour, action: Colour): Colour => {
    storeValue(COLOUR_KEY, action);
    return action;
};

export default colourReducer;
