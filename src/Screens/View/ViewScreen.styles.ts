import styled from '@emotion/native';
import { Dimensions, TouchableOpacity } from 'react-native';

export const YearlyTitle = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
    color: ${props => props.theme.text};
`;
