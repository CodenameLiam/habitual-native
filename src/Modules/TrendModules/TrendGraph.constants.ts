export type ActiveMonthType = 1 | 3 | 12;

export type ActiveMonth = {
    [key in ActiveMonthType]: string;
};

export const activeMonthRange: ActiveMonth = {
    1: '1 Month',
    3: '3 Months',
    12: '1 Year',
};
