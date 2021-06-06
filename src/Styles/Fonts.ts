import styled, { css } from '@emotion/native';

export const fontFamily = 'Montserrat';

export const headerFont = css`
    font-family: 'Montserrat';
    font-size: 22px;
    font-weight: 700;
`;

export const BodyFont = styled.Text`
    font-family: ${fontFamily};
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.text};
`;
