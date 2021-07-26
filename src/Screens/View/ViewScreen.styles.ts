import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const YearlyTitle = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    margin-top: 10px;
    text-align: center;
    color: ${props => props.theme.text};
`;
