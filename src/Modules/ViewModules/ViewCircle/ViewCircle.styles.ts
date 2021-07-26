import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
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
    font-size: ${heightPercentageToDP(3.5) + 'px'};
    color: ${props => props.theme.text};
`;
