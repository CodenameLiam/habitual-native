import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fontFamily } from 'Styles/Fonts';

export const Title = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(3) + 'px'};
    margin-bottom: 80px;
    margin-top: 100px;
    color: ${props => props.theme.text};
`;

export const SubTitle = styled(Animated.Text)`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    margin-top: 30px;
    text-align: center;
    height: ${heightPercentageToDP(10) + 'px'};
    padding: 0px 10px;
    color: ${props => props.theme.text};
`;

export const StartTouchable = styled.TouchableOpacity`
    width: 400px;
    max-width: 80%;
    height: ${heightPercentageToDP(6) + 'px'};
`;

export const StartButton = styled(Animated.View)`
    overflow: hidden;
    margin-top: 20px;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const StartButtonText = styled.Text`
    font-family: ${fontFamily};
    font-size: ${heightPercentageToDP(2) + 'px'};
    text-align: center;
    color: ${props => props.theme.text};
`;
