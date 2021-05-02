import moment from 'moment';
import { TrendMonthType } from './TrendChart.styles';

export const getHeight = (maxHeight: number, height: number): number => {
    return height === 0 || maxHeight === 0 ? 0 : (height / maxHeight) * 150;
};

export const getAlignment = (): TrendMonthType => {
    const diff = moment().diff(moment().startOf('month'), 'days');
    if (diff > 12) {
        return 'center';
    } else if (diff > 24) {
        return 'flex-start';
    } else return 'flex-end';
};
