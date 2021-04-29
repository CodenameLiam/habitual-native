import { IconProps } from 'Components/Icon';
import { EVERYDAY_SCHEDULE } from 'Controllers/HabitController/HabitConstants';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { IColours } from 'Styles/Colours';

export interface ICategory {
    id: CategoryType;
    name: string;
    icon: Partial<IconProps>;
    colour: IColours;
    habits?: Partial<IHabit>[];
}

export type CategoryType =
    | 'health'
    | 'wellbeing'
    | 'intellect'
    | 'organisation'
    | 'social'
    | 'diet'
    | 'art'
    | 'finance'
    | 'thoughful'
    | 'thankful';

export type AllCategories = {
    [category in CategoryType]: ICategory;
};

export const Categories: AllCategories = {
    health: {
        id: 'health',
        name: 'Health &\nFitness',
        icon: { family: 'materialcommunity', name: 'heart' },
        colour: 'GREEN',
        habits: [
            { name: 'Go For A Run', colour: 'MIDNIGHT', total: 1, schedule: { ...EVERYDAY_SCHEDULE }, type: 'count' },
            { name: 'Lift Weights', colour: 'TANGERINE', total: 1, schedule: { ...EVERYDAY_SCHEDULE }, type: 'count' },
        ],
    },
    wellbeing: {
        id: 'wellbeing',
        name: 'Mental\nWellbeing',
        icon: { family: 'materialcommunity', name: 'flower-tulip' },
        colour: 'PURPLE',
    },
    intellect: {
        id: 'intellect',
        name: 'Intellectual\nGrowth',
        icon: { family: 'materialcommunity', name: 'school' },
        colour: 'ORANGE',
    },
    organisation: {
        id: 'organisation',
        name: 'Organisation',
        icon: { family: 'materialcommunity', name: 'puzzle' },
        colour: 'PINK',
    },
    social: {
        id: 'social',
        name: 'Social\nDevelopment',
        icon: { family: 'materialcommunity', name: 'account-group' },
        colour: 'TANGERINE',
    },
    diet: {
        id: 'diet',
        name: 'Food &\nDiet',
        icon: { family: 'materialcommunity', name: 'food-apple' },
        colour: 'SKY',
    },
    art: {
        id: 'art',
        name: 'Arts &\nCreativity',
        icon: { family: 'materialcommunity', name: 'palette' },
        colour: 'YELLOW',
    },
    finance: {
        id: 'finance',
        name: 'Financial\nIndependence',
        icon: { family: 'materialcommunity', name: 'finance' },
        colour: 'AQUA',
    },
    thoughful: {
        id: 'thoughful',
        name: 'Being\nThoughtful',
        icon: { family: 'materialcommunity', name: 'account-heart' },
        colour: 'RED',
    },
    thankful: {
        id: 'thankful',
        name: 'Being\nThankful',
        icon: { family: 'materialcommunity', name: 'weather-sunset' },
        colour: 'BLUE',
    },
};
