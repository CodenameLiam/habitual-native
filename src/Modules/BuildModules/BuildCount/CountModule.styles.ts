import styled from '@emotion/native';
import { TextInput } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { GreyColours } from 'Styles/Colours';
import { fontFamilyExtraBold } from 'Styles/Fonts';

interface ButtonProps {
    colour: string;
    grey: boolean;
}

export const SqaureButton = styled.TouchableOpacity<ButtonProps>`
    background-color: ${props => (props.grey ? GreyColours.GREY2 + 30 : props.colour + 30)};
    border-radius: 5px;
    overflow: hidden;
    height: ${heightPercentageToDP(6) + 'px'};
    width: ${heightPercentageToDP(6) + 'px'};
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface ProgressInputProps {
    colour: string;
}

export const ProgressTextInput = styled(TextInput)<ProgressInputProps>`
    color: ${props => props.colour};
    background-color: ${props => props.theme.background};
    flex: 1;
    border-radius: 5px;
    text-align: center;
    font-family: ${fontFamilyExtraBold};
    font-size: ${heightPercentageToDP(2.5) + 'px'};
`;

export const ProgressText = styled.Text<ProgressInputProps>`
    color: ${props => props.colour};
    text-align: center;
    font-family: ${fontFamilyExtraBold};
    font-size: ${heightPercentageToDP(2.5) + 'px'};
`;
