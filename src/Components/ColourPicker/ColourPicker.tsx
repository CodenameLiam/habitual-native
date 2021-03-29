import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColours, IColours } from 'Styles/Colours';
import { PickerContainer, Swatch } from './ColourPicker.styles';

interface ColourPickerProps {
    updateGradient: (gradient: IColours) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ updateGradient }) => {
    return (
        <PickerContainer>
            {Object.keys(GradientColours).map((colour, index) => (
                <Swatch
                    key={colour}
                    onPress={() => updateGradient(colour as IColours)}
                    style={{ marginBottom: index < 6 ? 10 : 3 }}
                >
                    <LinearGradient
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[GradientColours[colour as IColours].start, GradientColours[colour as IColours].end]}
                    />
                </Swatch>
            ))}
        </PickerContainer>
    );
};

export default ColourPicker;
