import React, { useCallback, useMemo } from 'react';
import { GreyColours } from 'Styles/Colours';
import { ButtonContainer, ColourButtonContainer, TextContainer, TextContent } from './ColourButtonGroup.styles';

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

    return (
        <ColourButtonContainer>
            {buttons.length === buttonFunctions.length &&
                buttons.map((title, index) => (
                    <ButtonContainer key={index + title} width={width} backgroundColour={getColour(title)}>
                        <TextContainer onPress={buttonFunctions[index]}>
                            <TextContent colour={getColour(title)}>{title}</TextContent>
                        </TextContainer>
                    </ButtonContainer>
                ))}
        </ColourButtonContainer>
    );
};
