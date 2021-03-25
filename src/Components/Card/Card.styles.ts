import styled from '@emotion/native';

export const CardContainer = styled.View`
    margin: 15px;
    margin-bottom: 0px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.card};
`;

export const CardText = styled.Text`
    padding-bottom: 10px;
    color: ${props => props.theme.grey};
    font-size: 18px;
    font-family: 'Montserrat-Bold';
`;
