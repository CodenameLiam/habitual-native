import { useEffect, useState } from 'react';
import { IColours } from 'Styles/Colours';
import { getValue, storeValue } from './StorageController';

const COLOUR_KEY = '@Colour';
const DEFAULT_COLOUR: IColours = 'GREEN';

interface IColourController {
    loadingColour: boolean;
    colour: IColours;
    updateColour: (colour: IColours) => Promise<void>;
}

export const useColours = (): IColourController => {
    const [colour, setColour] = useState<IColours>('GREEN');
    const [loadingColour, setLoading] = useState<boolean>(true);

    const updateColour = async (colour: IColours): Promise<void> => {
        setColour(colour);
        storeValue(COLOUR_KEY, colour);
    };

    useEffect(() => {
        const configureColour = async (): Promise<void> => {
            const colour = await getValue(COLOUR_KEY);
            if (!colour) {
                updateColour(DEFAULT_COLOUR);
            } else {
                updateColour(colour as IColours);
            }
            setLoading(false);
        };
        configureColour();
    }, []);

    return { loadingColour, colour, updateColour };
};
