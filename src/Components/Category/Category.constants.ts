import { IconProps } from 'Components/Icon';
import { IColours } from 'Styles/Colours';

export interface ICategory {
    name: string;
    icon: Partial<IconProps>;
    colour: IColours;
}

export const Categories: ICategory[] = [
    { name: 'Health & \nFitness', icon: { family: 'materialcommunity', name: 'heart' }, colour: 'GREEN' },
    {
        name: 'Mental\nWellbeing',
        icon: { family: 'materialcommunity', name: 'flower-tulip' },
        colour: 'PURPLE',
    },
    {
        name: 'Intellectual\nGrowth',
        icon: { family: 'materialcommunity', name: 'school' },
        colour: 'ORANGE',
    },
    {
        name: 'Organisation',
        icon: { family: 'materialcommunity', name: 'puzzle' },
        colour: 'PINK',
    },

    {
        name: 'Social\nDevelopment',
        icon: { family: 'materialcommunity', name: 'account-group' },
        colour: 'TANGERINE',
    },
    {
        name: 'Food &\nDiet',
        icon: { family: 'materialcommunity', name: 'food-apple' },
        colour: 'SKY',
    },
    {
        name: 'Arts &\nCreativity',
        icon: { family: 'materialcommunity', name: 'palette' },
        colour: 'YELLOW',
    },

    {
        name: 'Financial\nIndependence',
        icon: { family: 'materialcommunity', name: 'finance' },
        colour: 'AQUA',
    },
    {
        name: 'Being\nThoughtful',
        icon: { family: 'materialcommunity', name: 'account-heart' },
        colour: 'RED',
    },
    {
        name: 'Being\nThankful',
        icon: { family: 'materialcommunity', name: 'weather-sunset' },
        colour: 'BLUE',
    },
];
