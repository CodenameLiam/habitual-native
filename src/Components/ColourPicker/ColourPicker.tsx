import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradient, Gradients } from 'Styles/Colours';
import { PickerContainer, Swatch } from './ColourPicker.styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colour } from 'Types/Colour.types';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface ColourPickerProps {
    size?: string;
    customOrder?: Colour[];
    updateGradient: (gradient: Colour) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ updateGradient, customOrder, size }) => {
    const handlePress = useCallback(
        (colour: Colour) => {
            ReactNativeHapticFeedback.trigger('impactLight');
            updateGradient(colour);
        },
        [updateGradient],
    );

    const gradients: Colour[] = useMemo(() => customOrder ?? (Object.keys(Gradients) as Colour[]), [customOrder]);

    return (
        <PickerContainer>
            {gradients.map((colour, index) => (
                <Swatch
                    key={colour}
                    size={size}
                    onPress={() => handlePress(colour as Colour)}
                    style={{
                        marginBottom: index < 6 ? heightPercentageToDP(1) : heightPercentageToDP(0.5),
                        aspectRatio: 1,
                    }}
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
