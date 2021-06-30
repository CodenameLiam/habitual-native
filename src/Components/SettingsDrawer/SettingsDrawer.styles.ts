import styled from '@emotion/native';
import Card from 'Components/Card/Card';

export const SettingsDrawerContainer = styled.View`
    flex: 1;
    overflow: hidden;
    background-color: ${props => props.theme.background};
`;

export const SettingsDrawerShadow = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 15px;
    margin-right: -15px;
    background-color: rgb(48, 47, 60);
    align-self: center;
`;

export const SettingsHeader = styled.View`
    padding: 10px;
`;

export const SettingsRow = styled.View`
    background-color: ${props => props.theme.card};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
`;

export const SettingsCard = styled(Card)`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
`;
