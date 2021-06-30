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
    z-index: 100;
`;

export const SettingsHeader = styled.View`
    padding: 10px;
    padding-bottom: 0px;
`;

export const SettingsRow = styled.View`
    min-height: 55px;
    background-color: ${props => props.theme.card};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    margin-bottom: 0px;
    padding: 10px 15px;
    border-radius: 10px;
`;

export const SettingsCard = styled(Card)`
    margin: 10px;
    padding: 10px 15px;
    border-radius: 10px;
`;
