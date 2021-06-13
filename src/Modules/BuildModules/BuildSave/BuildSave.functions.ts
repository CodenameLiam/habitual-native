import { HabitObject } from 'Types/Habit.types';

type HabitError = 'name' | 'schedule' | 'count' | 'time' | undefined;

export const habitErrorMessage = {
    name: 'Please enter a name for your new habit',
    schedule: 'Please schedule your habit for at least one day',
    count: 'Please assign a total for your habit',
    time: 'Please assign some time for your habit',
};

export const validateHabit = (habit: HabitObject): HabitError => {
    if (habit.name === '') {
        return 'name';
    } else if (Object.values(habit.schedule).every(value => value === false)) {
        return 'schedule';
    } else if (habit.total === 0 && habit.type === 'time') {
        return 'time';
    } else if (habit.total === 0 && habit.type === 'count') {
        return 'count';
    }
};
