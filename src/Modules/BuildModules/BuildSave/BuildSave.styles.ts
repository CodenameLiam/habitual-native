import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const SaveContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: ${heightPercentageToDP(2) + 'px'};
`;

export const SaveButton = styled(TouchableOpacity)`
    height: 60px;
    height: ${heightPercentageToDP(7) + 'px'};
    border-radius: 100px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px;
`;

export const SaveText = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2.2) + 'px'};
    color: ${props => props.theme.text};
`;
