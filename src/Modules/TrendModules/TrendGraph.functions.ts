import { isComplete } from 'Helpers/Habits';
import moment, { Moment } from 'moment';
import { Habits } from 'Types/Habit.types';

// Split array into chunks and get the total of each chunk
const chunkTotal = (arr: number[], len: number): number[] => {
    const chunks = [];
    const n = arr.length;
    let i = 0;

    let chunk;

    while (i < n) {
        chunk = arr.slice(i, (i += len));
        chunks.push(chunk.reduce((s, n) => s + n));
    }

    return chunks;
};

// Get the total number of habits completed on each date, within a given range (chunked)
export const getTrendData = (habits: Habits, dates: Moment[], chunk: number): number[] => {
    const data = dates.map(date => {
        let total = 0;
        Object.values(habits).forEach(habit => {
            isComplete(habit, date.format('YYYY-MM-DD')) && total++;
        });
        return total;
    });

    return chunk > 1 ? chunkTotal(data, chunk) : data;
};

// Get the labels for the trend graph
export const getTrendLabel = (index: number, monthRange: number): string => {
    if (index === 30) return 'Today';
    else if (index % 6 === 0) {
        return moment()
            .subtract(monthRange, 'month')
            .add(index * monthRange, 'day')
            .format('MMM D');
    } else return '';
};
