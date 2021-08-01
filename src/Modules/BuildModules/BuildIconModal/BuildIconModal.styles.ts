import styled from '@emotion/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontFamilyBold } from 'Styles/Fonts';

export const IconGroupContainer = styled.View`
    width: 100%;
`;

export const LabelContainer = styled.View`
    flex-direction: row;
    margin-top: ${heightPercentageToDP(3) + 'px'};
    margin-bottom: ${heightPercentageToDP(1) + 'px'};
    margin-left: ${heightPercentageToDP(1.5) + 'px'};
`;

export const Label = styled.Text`
    padding: ${heightPercentageToDP(1.25) + 'px'};
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-size: ${heightPercentageToDP(1.8) + 'px'};
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
    display: flex;
    align-items: center;
    padding: ${widthPercentageToDP(2) + 'px'};
`;
