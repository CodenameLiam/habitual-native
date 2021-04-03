import styled from '@emotion/native';
import React from 'react';
import { View, Text } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { GradientColours } from 'Styles/Colours';

interface ToastContainerProps {
    background: string;
}

const ToastContainer = styled.View<ToastContainerProps>`
    height: 40px;
    width: 90%;
    border-radius: 6px;
    background-color: ${props => props.background};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ToastText = styled.Text`
    font-family: 'Montserrat';
    font-weight: 600;
    color: ${props => props.theme.text};
`;

export const ToastConfig = {
    error: ({ text1, ...rest }: BaseToastProps) => (
        <ToastContainer background={GradientColours.RED.solid}>
            <ToastText>{text1}</ToastText>
        </ToastContainer>
    ),
};
