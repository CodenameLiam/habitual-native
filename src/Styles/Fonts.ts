import styled, { css } from '@emotion/native';

export const fontFamilyExtraBold = 'Montserrat-ExtraBold';
export const fontFamilyBold = 'Montserrat-Bold';
export const fontFamily = 'Montserrat-SemiBold';

export const headerFont = css`
    font-family: ${fontFamilyBold};
    font-size: 22px;
    font-weight: 600;
`;

export const BodyFont = styled.Text`
    font-family: ${fontFamily};
    font-size: 18px;
    color: ${props => props.theme.text};
    text-align: center;
`;

export const GraphFont = styled.Text`
    font-family: ${fontFamily};
    font-size: 14px;
    color: ${props => props.theme.grey};
`;
