import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColours, Colours } from 'Styles/Colours';
import { PickerContainer, Swatch } from './ColourPicker.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ColourPickerProps {
    updateGradient: (gradient: Colours) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ updateGradient }) => {
    const handlePress = useCallback(
        (colour: Colours) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            updateGradient(colour);
        },
        [updateGradient],
    );

    return (
        <PickerContainer>
            {Object.keys(GradientColours).map((colour, index) => (
                <Swatch
                    key={colour}
                    onPress={() => handlePress(colour as Colours)}
                    style={{ marginBottom: index < 6 ? 10 : 5 }}
                >
                    <LinearGradient
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[GradientColours[colour as Colours].start, GradientColours[colour as Colours].end]}
                    />
                </Swatch>
            ))}
        </PickerContainer>
    );
};

export default ColourPicker;
