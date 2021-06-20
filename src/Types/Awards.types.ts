export interface PerfectWeek {
    [key: string]: boolean; // key: id-date i.e. 1234-abcd-9z8y-2021-01-01
}

export interface PerfectMonth {
    [key: string]: boolean; // key: id-date i.e. 1234-abcd-9z8y-2021-06
}

export interface Awards {
    perfectWeek: PerfectWeek;
}
