import { HabitIcon } from 'Components/Icon/Icon.types';
import { Colour } from 'Types/Colour.types';
import { EVERYDAY_SCHEDULE } from 'Types/Habit.constants';
import { HabitObject } from 'Types/Habit.types';

export interface CategoryObject {
    id: CategoryType;
    name: string;
    icon: HabitIcon;
    colour: Colour;
    habits: HabitObject[];
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
    [category in CategoryType]: CategoryObject;
};

export const Categories: AllCategories = {
    health: {
        id: 'health',
        name: 'Health &\nFitness',
        icon: { family: 'materialcommunity', name: 'heart' },
        colour: 'GREEN',
        habits: [
            {
                id: 'Go for a run',
                icon: { family: 'materialcommunity', name: 'run' },
                name: 'Go for a run',
                colour: 'PURPLE',
                total: 1,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Go for a walk',
                icon: { family: 'materialcommunity', name: 'walk' },
                name: 'Go for a walk',
                colour: 'AQUA',
                total: 1,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Eat fruit & vegetables',
                icon: { family: 'materialcommunity', name: 'food-apple' },
                name: 'Eat fruit & vegetables',
                colour: 'LIME',
                total: 4,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Drink water',
                icon: { family: 'materialcommunity', name: 'beer' },
                name: 'Drink water',
                colour: 'SKY',
                total: 5,
                schedule: { ...EVERYDAY_SCHEDULE },
                dates: {},
                type: 'count',
            },
            {
                id: 'Lift weights',
                icon: { family: 'materialcommunity', name: 'dumbbell' },
                name: 'Lift weights',
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
