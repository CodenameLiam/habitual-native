import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { GreyColours } from 'Styles/Colours';
import { fontFamilyBold } from 'Styles/Fonts';

const scheduleDimensions = Dimensions.get('screen').width / 10 + 'px';

export const ScheduleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    padding-bottom: 10px;
`;

export const ScheduleButton = styled(TouchableOpacity)`
    width: ${scheduleDimensions};
    height: ${scheduleDimensions};
    border-radius: ${scheduleDimensions};
    overflow: hidden;
    background-color: ${props => props.theme.background};
    margin-bottom: 5px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

interface ScheduleTextProps {
    grey: boolean;
}

export const ScheduleText = styled.Text<ScheduleTextProps>`
    font-family: ${fontFamilyBold};
    font-size: ${heightPercentageToDP(1.8) + 'px'};
    color: ${props => (props.grey ? GreyColours.GREY2 : '#ffffff')};
`;
