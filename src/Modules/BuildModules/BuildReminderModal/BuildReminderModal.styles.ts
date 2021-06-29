import styled, { css } from '@emotion/native';

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
    height: 50px;
    flex: 1;
    background-color: ${props => props.colour};
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
