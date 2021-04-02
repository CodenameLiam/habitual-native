import styled from '@emotion/native';
import { Dimensions } from 'react-native';

export const ViewScreenTitle = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    padding: 15px;
    text-align: center;
    color: ${props => props.theme.text};
`;

interface CircleContainerProps {
    height: number;
}

export const CircleContainer = styled.View<CircleContainerProps>`
    height: ${props => props.height + 'px'};
    justify-content: center;
    align-items: center;
    /* background: red; */
`;

export const CircleText = styled.Text`
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 28px;
    color: ${props => props.theme.text};
`;
