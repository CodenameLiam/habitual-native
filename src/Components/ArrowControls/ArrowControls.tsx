import Icon from 'Components/Icon';
import React from 'react';
import { ArrowButton, ArrowContainer, ArrowTitle } from './ArrowControls.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { GreyColours } from 'Styles/Colours';
import { TouchableOpacity } from 'react-native-gesture-handler';

const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

interface ArrowControlProps {
    colour: string;
    title: string;
    onLeftPress: () => void;
    onRightPress: () => void;
    onTitlePress?: () => void;
    rightDisabled?: boolean;
}

const ArrowControls: React.FC<ArrowControlProps> = ({
    colour,
    title,
    onLeftPress,
    onRightPress,
    onTitlePress,
    rightDisabled,
}) => {
    const handleLeftPress = (): void => {
        onLeftPress();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleRightPress = (): void => {
        onRightPress();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleTitlePress = (): void => {
        onTitlePress && onTitlePress();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <ArrowContainer>
            <ArrowButton onPress={handleLeftPress} colour={colour} placement="left" hitSlop={hitSlop}>
                <Icon family="fontawesome5" name="angle-left" size={20} colour={colour} />
            </ArrowButton>
            <TouchableOpacity disabled={onTitlePress === undefined} onPress={handleTitlePress}>
                <ArrowTitle>{title}</ArrowTitle>
            </TouchableOpacity>

            <ArrowButton
                onPress={handleRightPress}
                disabled={rightDisabled}
                colour={rightDisabled ? GreyColours.GREY2 : colour}
                placement="right"
                hitSlop={hitSlop}
            >
                <Icon
                    family="fontawesome5"
                    name="angle-right"
                    size={20}
                    colour={rightDisabled ? GreyColours.GREY2 : colour}
                />
            </ArrowButton>
        </ArrowContainer>
    );
};

export default ArrowControls;
