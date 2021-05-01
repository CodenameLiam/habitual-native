import { IconProps } from 'Components/Icon';
import { EVERYDAY_SCHEDULE } from 'Controllers/HabitController/HabitConstants';
import { IHabit } from 'Controllers/HabitController/HabitController';
import { IColours } from 'Styles/Colours';

export interface ICategory {
    id: CategoryType;
    name: string;
    icon: Partial<IconProps>;
    colour: IColours;
    habits: IHabit[];
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
            {
                id: 'Eat Fruit & Vegetables',
                icon: { family: 'materialcommunity', name: 'food-apple' },
                name: 'Eat Fruit & Vegetables',
                colour: 'LIME',
                total: 4,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Drink Water',
                icon: { family: 'materialcommunity', name: 'beer' },
                name: 'Drink Water',
                colour: 'BLUE',
                total: 5,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Go For A Run',
                icon: { family: 'materialcommunity', name: 'run' },
                name: 'Go For A Run',
                colour: 'GREEN',
                total: 1,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Go For A Walk',
                icon: { family: 'materialcommunity', name: 'walk' },
                name: 'Go For A Walk',
                colour: 'AQUA',
                total: 1,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Lift Weights',
                icon: { family: 'materialcommunity', name: 'dumbbell' },
                name: 'Lift Weights',
                colour: 'ORANGE',
                total: 1,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
        ],
    },
    wellbeing: {
        id: 'wellbeing',
        name: 'Mental\nWellbeing',
        icon: { family: 'materialcommunity', name: 'flower-tulip' },
        colour: 'PURPLE',
        habits: [],
    },
    intellect: {
        id: 'intellect',
        name: 'Intellectual\nGrowth',
        icon: { family: 'materialcommunity', name: 'school' },
        colour: 'ORANGE',
        habits: [],
    },
    organisation: {
        id: 'organisation',
        name: 'Organisation',
        icon: { family: 'materialcommunity', name: 'puzzle' },
        colour: 'PINK',
        habits: [],
    },
    social: {
        id: 'social',
        name: 'Social\nDevelopment',
        icon: { family: 'materialcommunity', name: 'account-group' },
        colour: 'TANGERINE',
        habits: [],
    },
    diet: {
        id: 'diet',
        name: 'Food &\nDiet',
        icon: { family: 'materialcommunity', name: 'food-apple' },
        colour: 'SKY',
        habits: [],
    },
    art: {
        id: 'art',
        name: 'Arts &\nCreativity',
        icon: { family: 'materialcommunity', name: 'palette' },
        colour: 'YELLOW',
        habits: [],
    },
    finance: {
        id: 'finance',
        name: 'Financial\nIndependence',
        icon: { family: 'materialcommunity', name: 'finance' },
        colour: 'AQUA',
        habits: [],
    },
    thoughful: {
        id: 'thoughful',
        name: 'Being\nThoughtful',
        icon: { family: 'materialcommunity', name: 'account-heart' },
        colour: 'RED',
        habits: [],
    },
    thankful: {
        id: 'thankful',
        name: 'Being\nThankful',
        icon: { family: 'materialcommunity', name: 'weather-sunset' },
        colour: 'BLUE',
        habits: [],
    },
};
