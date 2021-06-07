import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';

export const SaveContainer = styled.View`
    flex: 1;
    align-items: center;
    margin: 10px;
`;

export const SaveButton = styled(TouchableOpacity)`
    height: 60px;
    border-radius: 100px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px;
`;

export const SaveText = styled.Text`
    font-family: 'Montserrat-SemiBold';
    font-size: 20px;
    color: ${props => props.theme.text};
`;