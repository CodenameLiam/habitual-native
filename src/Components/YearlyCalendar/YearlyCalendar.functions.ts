import { HabitObject } from 'Types/Habit.types';

// Gets the colour for a particular date cell
export const getColour = (habit: HabitObject, date: string, colour: string, theme: string): string => {
    if (habit.dates[date]) {
        const { progress, total } = habit.dates[date];
        const alpha = (Math.round(Math.min(progress / total, 1) * 10) / 10) * 100;
        return alpha >= 100 ? colour : alpha > 20 ? colour + alpha : theme;
    } else {
        return theme;
    }
};
