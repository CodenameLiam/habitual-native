import { getTime } from 'Helpers/Habits';
import React, { FC } from 'react';
import { ProgressText, ProgressTimeInput } from './TimeModules.styles';

interface TimeModuleProps {
    total: number;
    colour: string;
    onPress: () => void;
}

const TimeModule: FC<TimeModuleProps> = ({ colour, total, onPress }) => {
    return (
        <ProgressTimeInput onPress={onPress}>
            <ProgressText colour={colour}>{getTime(total).formatTime}</ProgressText>
        </ProgressTimeInput>
    );
};

export default TimeModule;
