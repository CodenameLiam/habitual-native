import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { HabitReminder } from 'Types/Habit.types';

const MAX_HOURS = 12;
const MAX_MINUTES = 59;

const zeroPad = (num: number): string => {
    return num < 10 ? `0${num}` : String(num);
};

export const getReminderHoursItems = (colour: string): JSX.Element[] => {
    const items = [];
    for (let i = 1; i <= MAX_HOURS; i++) {
        items.push(<Picker.Item key={i} value={i} label={String(i) ?? ''} color={colour} />);
    }
    return items;
};

export const getReminderMinutesItems = (colour: string): JSX.Element[] => {
    const items = [];
    for (let i = 0; i <= MAX_MINUTES; i++) {
        items.push(<Picker.Item key={i} value={i} label={zeroPad(i) ?? ''} color={colour} />);
    }
    return items;
};

export const getReminderString = (reminder: HabitReminder): string => {
    return `${reminder.hour}:${zeroPad(reminder.minute)} ${reminder.time}`;
};
