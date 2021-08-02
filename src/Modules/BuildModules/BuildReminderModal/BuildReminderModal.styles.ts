import styled, { css } from '@emotion/native';
import MaskInput from 'react-native-mask-input';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const BuildReminderModalContainer = styled.View`
    flex: 1;
    padding-bottom: 20px;
`;

interface ReminderButtonProps {
    colour: string;
}

export const ReminderButton = styled.TouchableOpacity<ReminderButtonProps>`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 10px;
    height: ${heightPercentageToDP(6) + 'px'};
    flex: 1;
    overflow: hidden;
    background-color: ${props => props.colour};
`;

export const ReminderInput = styled(MaskInput)<ReminderButtonProps>`
    flex: 1;
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    font-family: ${fontFamily};
    color: ${props => props.colour};
    background-color: ${props => props.theme.background};
    font-size: ${heightPercentageToDP(2) + 'px'};
`;

export const ReminderTimeButton = styled(ReminderButton)`
    max-width: ${widthPercentageToDP(15) + 'px'};
    border-radius: 5px;
    margin-left: 10px;
`;

export const ReminderTime = styled(ReminderButton)`
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0px 15px;
`;

export const CancelReminder = css`
    margin-right: 10px;
`;

export const AddReminderPlus = css`
    padding-top: 2px;
    padding-right: 15px;
`;
