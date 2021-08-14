import styled from '@emotion/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

interface ContainerProps {
    colour?: string;
}

export const Container = styled.View<ContainerProps>`
    background-color: ${props => props.colour ?? props.theme.card};
    height: ${heightPercentageToDP(8.5) + 'px'};
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${heightPercentageToDP(1) + 'px'};
    margin-bottom: 0px;
`;

export const CenterContainer = styled.TouchableOpacity`
    flex: 1;
    height: 100%;
    flex-direction: row;
    align-items: center;
`;

export const ManageButton = styled.TouchableOpacity`
    aspect-ratio: 1;
    height: ${heightPercentageToDP(8.5) + 'px'};
    justify-content: center;
    align-items: center;
`;
