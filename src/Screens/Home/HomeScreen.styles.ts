import styled from '@emotion/native';
import { isTablet } from 'Helpers/Size';

export const CircleDatesContainer = styled.View`
    justify-content: ${isTablet() ? 'space-evenly' : 'space-between'};
    flex-direction: row;
    padding: 20px;
    padding-bottom: 10px;
`;
