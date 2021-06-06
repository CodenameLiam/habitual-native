import React, { FC } from 'react';
import { BodyFont } from 'Styles/Fonts';
import { EmptyPromptContainer } from './EmptyPrompt.styles';

interface EmptyPromptProps {
    text: string;
}

const EmptyPrompt: FC<EmptyPromptProps> = ({ text }) => (
    <EmptyPromptContainer>
        <BodyFont>{text}</BodyFont>
    </EmptyPromptContainer>
);

export default EmptyPrompt;
