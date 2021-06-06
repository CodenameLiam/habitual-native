import { Gradients } from 'Styles/Colours';
import { Colour } from 'Types/Colour.types';

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const getRandomColour = (): Colour => {
    const gradientKeys = Object.keys(Gradients);
    const randomGradientIndex = getRandomInt(gradientKeys.length);
    const randomGradientResult = gradientKeys[randomGradientIndex];
    return randomGradientResult as Colour;
};
