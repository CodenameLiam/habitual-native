import styled from '@emotion/native';
import { Dimensions } from 'react-native';

export const CalendarButtonGroupContainer = styled.View`
    padding: 20px;
`;

const weekCellContainer = Dimensions.get('screen').width / 13.5;
const weekTextContainer = Dimensions.get('screen').width - weekCellContainer * 9.5;

export const WeekCell = styled.View`
    height: ${weekCellContainer + 'px'};
    width: ${weekTextContainer + 'px'};
    margin: 3px;
    background-color: ${props => props.theme.card};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;
