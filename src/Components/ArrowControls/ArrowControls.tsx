import Icon from 'Components/Icon';
import React from 'react';
import { ArrowButton, ArrowContainer, ArrowTitle } from './ArrowControls.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

interface ArrowControlProps {
    colour: string;
    title: string;
    onLeftPress: () => void;
    onRightPress: () => void;
}

const ArrowControls: React.FC<ArrowControlProps> = ({ colour, title, onLeftPress, onRightPress }) => {
    const handleLeftPress = (): void => {
        onLeftPress();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleRightPress = (): void => {
        onRightPress();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <ArrowContainer>
            <ArrowButton onPress={handleLeftPress} colour={colour} placement="left" hitSlop={hitSlop}>
                <Icon family="fontawesome5" name="angle-left" size={20} colour={colour} />
            </ArrowButton>
            <ArrowTitle>{title}</ArrowTitle>
            <ArrowButton onPress={handleRightPress} colour={colour} placement="right" hitSlop={hitSlop}>
                <Icon family="fontawesome5" name="angle-right" size={20} colour={colour} />
            </ArrowButton>
        </ArrowContainer>
    );
};

export default ArrowControls;
