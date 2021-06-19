import styled, { css } from '@emotion/native';

export const GrowContainer = styled.View`
    flex: 1;
    position: relative;
`;

interface GrowShadowProps {
    top?: boolean;
}

export const GrowShadow = styled.View<GrowShadowProps>`
    background-color: ${props => props.theme.background};
    ${props => (props.top ? 'top: 0' : 'bottom: 0')};
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    z-index: 1;
`;

export const GrowScrollContainer = styled.ScrollView`
    flex-grow: 1;
`;

export const GrowScrollContent = css`
    padding-top: 15px;
    padding-bottom: 15px;
`;
