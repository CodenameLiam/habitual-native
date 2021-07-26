import moment from 'moment';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { TrendMonthType } from './TrendChart.styles';

export const maxChartHeight = heightPercentageToDP(20);

export const getHeight = (maxHeight: number, height: number): number => {
    return height === 0 || maxHeight === 0 ? 0 : (height / maxHeight) * maxChartHeight;
};

export const getAlignment = (): TrendMonthType => {
    const diff = moment().diff(moment().startOf('month'), 'days');
    if (diff > 12) {
        return 'center';
    } else if (diff > 24) {
        return 'flex-start';
    } else return 'flex-end';
};
