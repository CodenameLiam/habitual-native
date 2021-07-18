import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const TouchableIcon = styled.TouchableOpacity`
    margin: 15px;
    margin-bottom: 0px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    height: ${heightPercentageToDP(6) + 'px'};
    background-color: ${props => props.theme.card};
`;
