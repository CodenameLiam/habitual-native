import styled from '@emotion/native';

interface CircleContainerProps {
    height: number;
}

export const CircleContainer = styled.View<CircleContainerProps>`
    height: ${props => props.height + 'px'};
    justify-content: center;
    align-items: center;
`;

export const CircleText = styled.Text`
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 30px;
    color: ${props => props.theme.text};
`;
