import styled, { css } from '@emotion/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const AllStatsContainer = styled.View`
    padding-bottom: 20px;
`;

// Container for a statistic
export const StatsContainer = styled.View`
    flex-direction: row;
`;

// Container for stats content
export const StatsContentContainer = styled.View`
    flex-direction: row;
    padding: 5px;
    align-items: center;
`;

// Text that appears on a stats card
export const StatsText = styled.Text`
    font-size: ${heightPercentageToDP(3.5) + 'px'};
    font-family: ${fontFamily};
    text-align: center;
    padding-left: 15px;
    color: ${props => props.theme.text};
`;

interface StatsBarProps {
    colour: string;
}

// Bar the appears on a stats card
export const StatsBar = styled.View<StatsBarProps>`
    background-color: ${props => props.colour};
    position: absolute;
    width: ${widthPercentageToDP(3) + 'px'};
    top: 0;
    bottom: 0;
    left: 0;
`;

// Default stats card
export const StatsCard = css`
    flex: 1;
    overflow: hidden;
    align-items: center;
`;

// Left stats card
export const StatsCardLeft = css`
    flex: 1;
    overflow: hidden;
    align-items: center;
    margin-right: 0px;
`;
