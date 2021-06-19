import { HabitObject, ScheduleType } from 'Types/Habit.types';

// Returns true if the habit should be disabled
export const renderDisabledIcon = (habit: HabitObject, day: string, schedule: ScheduleType): boolean => {
    if (habit.dates[day] && habit.dates[day].progress > 0) return false;
    if (!habit.schedule[schedule]) return true;
    return false;
};
