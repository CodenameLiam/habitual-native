import moment from 'moment';

// The past week as an array of moments
export const weekArray = [...Array(7).keys()].reverse().map(date => moment().subtract(date, 'day'));
