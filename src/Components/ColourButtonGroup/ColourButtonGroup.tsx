import React, { useCallback, useMemo } from 'react';
import { GreyColours } from 'Styles/Colours';
import { ButtonContainer, ColourButtonContainer, TextContainer, TextContent } from './ColourButtonGroup.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ColouredButtonGroupProps {
    colour: string;
    buttons: string[];
    activeTitle?: string;
    buttonFunctions: (() => void)[];
}

export const ColourButtonGroup: React.FC<ColouredButtonGroupProps> = ({
    buttons,
    buttonFunctions,
    colour,
    activeTitle,
}) => {
    const width = useMemo(() => 95 / buttons.length, [buttons.length]);
    const getColour = useCallback(
        (title: string) => {
            if (activeTitle !== undefined) {
                return title === activeTitle ? colour : GreyColours.GREY2;
            } else {
                return colour;
            }
        },
        [colour, activeTitle],
    );

    const handlePress = (buttonFunction: () => void): void => {
        buttonFunction();
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    return (
        <ColourButtonContainer>
            {buttons.length === buttonFunctions.length &&
                buttons.map((title, index) => (
                    <ButtonContainer key={index + title} width={width} backgroundColour={getColour(title)}>
                        <TextContainer onPress={() => handlePress(buttonFunctions[index])}>
                            <TextContent colour={getColour(title)}>{title}</TextContent>
                        </TextContainer>
                    </ButtonContainer>
                ))}
        </ColourButtonContainer>
    );
};
