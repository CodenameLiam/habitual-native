import styled, { css } from '@emotion/native';

export const StatsContainer = styled.View`
    flex-direction: row;
`;

export const StatsContentContainer = styled.View`
    flex-direction: row;
    padding: 5px;
    align-items: center;
`;

export const StatsText = styled.Text`
    font-size: 30px;
    font-family: 'Montserrat';
    font-weight: 600;
    text-align: center;
    padding-left: 15px;
    color: ${props => props.theme.text};
`;

interface StatsBarProps {
    colour: string;
}

export const StatsBar = styled.View<StatsBarProps>`
    background-color: ${props => props.colour};
    position: absolute;
    width: 10px;
    top: 0;
    bottom: 0;
    left: 0;
`;

export const StatsCard = css`
    flex: 1;
    overflow: hidden;
    align-items: center;
`;

export const StatsCardLeft = css`
    flex: 1;
    overflow: hidden;
    align-items: center;
    margin-right: 0px;
`;
