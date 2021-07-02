import styled from '@emotion/native';
import { fontFamilyExtraBold } from 'Styles/Fonts';

interface CircleContainerProps {
    height: number;
}

export const CircleContainer = styled.View<CircleContainerProps>`
    height: ${props => props.height + 'px'};
    justify-content: center;
    align-items: center;
`;

export const CircleText = styled.Text`
    font-family: ${fontFamilyExtraBold};
    font-size: 30px;
    color: ${props => props.theme.text};
`;
