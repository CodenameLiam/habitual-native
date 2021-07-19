import styled, { css } from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const fontFamilyExtraBold = 'Montserrat-ExtraBold';
export const fontFamilyBold = 'Montserrat-Bold';
export const fontFamily = 'Montserrat-SemiBold';

export const headerFont = css`
    font-family: ${fontFamilyBold};
    font-weight: 600;
    font-size: ${heightPercentageToDP(2.5) + 'px'};
`;

export const BodyFont = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    color: ${props => props.theme.text};
    text-align: center;
`;

export const GraphFont = styled.Text`
    font-family: ${fontFamily};
    font-size: 14px;
    color: ${props => props.theme.grey};
`;
