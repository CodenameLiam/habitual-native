import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientColours } from 'Styles/Colours';
import { Colour } from 'Types/Colour.types';

interface HeaderBackgroundProps {
    colour: Colour;
}

const HeaderBackground: React.FC<HeaderBackgroundProps> = ({ colour }) => {
    return (
        <LinearGradient
            colors={[GradientColours[colour].start, GradientColours[colour].end]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    );
};

export default HeaderBackground;
