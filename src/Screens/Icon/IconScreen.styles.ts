import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const IconScreenContainer = styled.View`
    background-color: ${props => props.theme.background};
    padding-bottom: 50px;
    align-items: center;
`;

export const IconGroupContainer = styled.View`
    width: 100%;
    padding: 10px;
`;

export const LabelContainer = styled.View`
    flex-direction: row;
    margin-top: 25px;
    margin-bottom: 10px;
    margin-left: 10px;
`;

export const Label = styled.Text`
    padding: 10px;
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};
    font-size: 16px;
    font-family: 'Montserrat-Bold';
    overflow: hidden;
`;

export const Row = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const IconContainer = styled(TouchableOpacity)`
    padding: 12px;
    display: flex;
    align-items: center;
`;
