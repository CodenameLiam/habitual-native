import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { CardContainer, CardText } from './Card.styles';

interface CardProps {
    children?: React.ReactNode;
    title?: string;
    style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, title, style }) => {
    return (
        <CardContainer style={style}>
            {title && (
                <CardText>
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}>{title}</Text>
                </CardText>
            )}
            {children}
        </CardContainer>
    );
};

export default Card;
