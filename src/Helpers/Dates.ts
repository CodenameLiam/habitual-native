import moment, { Moment } from 'moment';

// Todays date
export const today = moment().format('YYYY-MM-DD');

// The past week as an array of moments
export const weekArray = [...Array(7).keys()].reverse().map(date => moment().subtract(date, 'day'));

// An array of dates between two values
export const dayArray = (start: Moment, end: Moment): Moment[] => {
    const dates = [];
    while (start.isSameOrBefore(end)) {
        start.add(1, 'day');
        dates.push(start.clone());
    }
    return dates;
};
