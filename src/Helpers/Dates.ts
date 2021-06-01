import moment from 'moment';

export const weekArray = [...Array(7).keys()].reverse().map(date => moment().subtract(date, 'day'));
