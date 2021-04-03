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

// interface CircleContainerProps {
//     height: number;
// }

// export const CircleContainer = styled.View<CircleContainerProps>`
//     height: ${props => props.height + 'px'};
//     justify-content: center;
//     align-items: center;
//     /* background: red; */
// `;

// export const CircleText = styled.Text`
//     font-family: 'Montserrat';
//     font-weight: 800;
//     font-size: 28px;
//     color: ${props => props.theme.text};
// `;
