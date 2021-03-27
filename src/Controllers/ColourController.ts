import { useEffect, useState } from 'react';
import { IColours } from 'Styles/Colours';
import { getValue, storeValue } from './StorageController';

const COLOUR_KEY = '@Colour';

interface IColourController {
    loadingColour: boolean;
    colour: IColours;
    updateColour: (colour: IColours) => Promise<void>;
}

export const useColours = (): IColourController => {
    const [colour, setColour] = useState<IColours>('GREEN');
    const [loadingColour, setLoading] = useState<boolean>(true);

    const getColour = async (): Promise<void> => {
        const colour = await getValue(COLOUR_KEY);
        setColour(colour as IColours);
        setLoading(false);
    };

    const updateColour = async (colour: IColours): Promise<void> => {
        setColour(colour);
        storeValue(COLOUR_KEY, colour);
    };

    useEffect(() => {
        getColour();
    }, []);

    return { loadingColour, colour, updateColour };
};
