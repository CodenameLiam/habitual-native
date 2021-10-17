import styled, { css } from '@emotion/native';
import { isTablet } from 'Helpers/Size';
import Animated from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import TextTicker from 'react-native-text-ticker';
import { fontFamily } from 'Styles/Fonts';

interface HabitProps {
    colour?: string;
}

export const HabitContainer = styled(Animated.View)<HabitProps>`
    background-color: ${props => props.colour ?? props.theme.card};
    height: ${heightPercentageToDP(8.5) + 'px'};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${widthPercentageToDP(1) + 'px'};
`;

export const HabitContentContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 5px;
    flex: 1;
    height: 100%;
`;

export const HabitIconContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 15px;
    width: ${widthPercentageToDP(7) + 'px'};
    position: relative;
`;

interface HabitColourContainerProps {
    colour: string;
}
export const HabitColourContainer = styled(Animated.View)<HabitColourContainerProps>`
    position: absolute;
    background-color: ${props => props.colour};
    width: ${(isTablet() ? 50 : 35) + 'px'};
    overflow: hidden;
    border-radius: 1000px;
    aspect-ratio: 1;
`;

export const HabitTextContainer = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
`;

export const HabitText = styled(TextTicker)<HabitProps>`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    color: ${props => props.colour ?? props.theme.text};
`;

export const RightAction = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 5px;
    border-radius: 10px;
    background-color: ${props => props.theme.card};
`;

export const HabitScroll = css`
    padding: 10px;
`;

export const HabitIcon = css`
    position: absolute;
    z-index: 1;
`;

export const HabitProgressButton = css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
`;

export const HabitProgressText = styled.Text<HabitProps>`
    font-size: ${heightPercentageToDP(1.5) + 'px'};
    font-family: ${fontFamily};
    color: ${props => props.colour ?? props.theme.text};
`;
