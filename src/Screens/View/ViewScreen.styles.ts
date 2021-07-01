import styled from '@emotion/native';
import { fontFamily } from 'Styles/Fonts';

export const YearlyTitle = styled.Text`
    font-family: ${fontFamily};
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
    color: ${props => props.theme.text};
`;
