import styled from '@emotion/native';

export const SettingsDrawerParent = styled.View`
    flex: 1;
    overflow: hidden;
    background-color: ${props => props.theme.background};
`;

export const SettingsDrawerShaddow = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 15px;
    margin-right: -15px;
    background-color: rgb(48, 47, 60);
    align-self: center;
`;
