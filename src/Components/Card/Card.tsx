import React from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { CardContainer, CardText } from './Card.styles';

interface CardProps {
    children?: React.ReactNode;
    title?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({ children, title, style, textStyle }) => {
    return (
        <CardContainer style={style}>
            {title && (
                <CardText>
                    <TextTicker
                        animationType="bounce"
                        scroll={true}
                        duration={3000}
                        bounceDelay={1500}
                        marqueeDelay={1000}
                        bouncePadding={{ left: 0, right: 0 }}
                        style={[textStyle, { fontFamily: 'Montserrat-Bold' }]}
                    >
                        {title}
                    </TextTicker>
                </CardText>
            )}
            {children}
        </CardContainer>
    );
};

export default Card;
