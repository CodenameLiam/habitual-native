import styled from '@emotion/native';
import { fontFamilyBold } from 'Styles/Fonts';

export const IconGroupContainer = styled.View`
    width: 100%;
`;

export const LabelContainer = styled.View`
    flex-direction: row;
    margin-top: 25px;
    margin-bottom: 10px;
    margin-left: 10px;
`;

export const Label = styled.Text`
    padding: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-size: 16px;
    font-family: ${fontFamilyBold};
    overflow: hidden;
`;

export const Row = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const IconContainer = styled.TouchableOpacity`
    padding: 12px;
    display: flex;
    align-items: center;
`;
