import styled from '@emotion/native';
import TextTicker from 'react-native-text-ticker';

export const CardContainer = styled.View`
    margin: 15px;
    margin-bottom: 0px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.card};
    overflow: hidden;
`;

export const CardText = styled(TextTicker)`
    padding-bottom: 10px;
    color: ${props => props.theme.grey};
    font-size: 18px;
    font-family: Montserrat;
    font-weight: 600;
`;
