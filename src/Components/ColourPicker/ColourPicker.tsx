import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from 'Styles/Colours';
import { PickerContainer, Swatch } from './ColourPicker.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colour } from 'Types/Colour.types';

interface ColourPickerProps {
    updateGradient: (gradient: Colour) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ updateGradient }) => {
    const handlePress = useCallback(
        (colour: Colour) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            updateGradient(colour);
        },
        [updateGradient],
    );

    return (
        <PickerContainer>
            {Object.keys(Gradients).map((colour, index) => (
                <Swatch
                    key={colour}
                    onPress={() => handlePress(colour as Colour)}
                    style={{ marginBottom: index < 6 ? 10 : 5 }}
                >
                    <LinearGradient
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[Gradients[colour as Colour].start, Gradients[colour as Colour].end]}
                    />
                </Swatch>
            ))}
        </PickerContainer>
    );
};

export default ColourPicker;
