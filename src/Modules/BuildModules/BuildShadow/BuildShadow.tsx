import styled from '@emotion/native';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const ShadowModalContainer = styled(Animated.View)`
    background-color: #000;
    z-index: 2;
`;

interface BuildShadowProps {
    shadow: Animated.Value<number>;
}

const BuildShadow: FC<BuildShadowProps> = ({ shadow }) => {
    const animatedShadowOpacity = Animated.interpolateNode(shadow, {
        inputRange: [0, 1],
        outputRange: [0.5, 0],
    });

    return (
        <ShadowModalContainer
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { opacity: animatedShadowOpacity }]}
        />
    );
};

export default BuildShadow;
