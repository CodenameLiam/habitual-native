import styled from '@emotion/native';
import React from 'react';
import { BaseToastProps } from 'react-native-toast-message';
import { Gradients } from 'Styles/Colours';
import { fontFamily } from 'Styles/Fonts';

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
    font-family: ${fontFamily};
    font-weight: 600;
    color: ${props => props.theme.text};
`;

export const ToastConfig = {
    error: ({ text1, ...rest }: BaseToastProps) => (
        <ToastContainer background={Gradients.RED.solid}>
            <ToastText>{text1}</ToastText>
        </ToastContainer>
    ),
};
