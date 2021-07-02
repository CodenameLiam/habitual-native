import styled from '@emotion/native';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

export const CardContainer = styled.View`
    margin: 15px;
    margin-bottom: 0px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.card};
    overflow: hidden;
`;

export const CardContainerCircle = styled(CardContainer)`
    border-radius: 100px;
    margin-left: 0px;
`;

export const CardText = styled(TextTicker)`
    width: 100%;
    padding-bottom: 10px;
    color: ${props => props.theme.grey};
    font-size: 18px;
    font-family: ${fontFamily};
`;

export const CardTextAndroid = styled.Text`
    width: 100%;
    padding-bottom: 10px;
    padding-left: 5px;
    color: ${props => props.theme.grey};
    font-size: 18px;
    font-family: ${fontFamily};
`;
