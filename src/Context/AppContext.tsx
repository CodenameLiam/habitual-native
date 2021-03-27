import { IAllHabits, IHabit } from 'Controllers/HabitController/HabitController';
import { createContext } from 'react';
import { IColours } from 'Styles/Colours';

interface IAppContext {
    habits: IAllHabits;
    updateHabit: (habit: IHabit) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    colour: IColours;
    updateColour: (colour: IColours) => Promise<void>;
}

const DEFAULT_VALUE: IAppContext = {
    habits: {},
    updateHabit: async () => {},
    deleteHabit: async () => {},
    colour: 'GREEN',
    updateColour: async () => {},
};

export const AppContext = createContext<IAppContext>(DEFAULT_VALUE);
