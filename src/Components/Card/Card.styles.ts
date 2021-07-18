import styled from '@emotion/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

export const CardContainer = styled.View`
    margin: 15px;
    margin-bottom: 0px;
    padding: ${heightPercentageToDP(1) + 'px'};
    border-radius: 5px;
    background-color: ${props => props.theme.card};
    overflow: hidden;
    align-items: flex-start;
`;

export const CardContainerCircle = styled(CardContainer)`
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    height: ${heightPercentageToDP(6) + 'px'};
    margin-left: 0px;
`;

export const CardText = styled(TextTicker)`
    width: 100%;
    padding-bottom: 10px;
    color: ${props => props.theme.grey};
    font-size: ${heightPercentageToDP(2) + 'px'};
    font-family: ${fontFamily};
`;
