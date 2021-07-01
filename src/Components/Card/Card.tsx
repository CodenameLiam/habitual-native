import React from 'react';
import { Platform, TextStyle, ViewStyle } from 'react-native';
import { CardContainer, CardText, CardTextAndroid } from './Card.styles';

interface CardProps {
    children?: React.ReactNode;
    title?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({ children, title, style, textStyle }) => {
    return (
        <CardContainer style={style}>
            {title &&
                (Platform.OS === 'ios' ? (
                    <CardText
                        animationType="bounce"
                        scroll={true}
                        duration={3000}
                        bounceDelay={1500}
                        marqueeDelay={1000}
                        bouncePadding={{ left: 0, right: 0 }}
                        style={[textStyle]}
                    >
                        {title}
                    </CardText>
                ) : (
                    <CardTextAndroid style={[textStyle]}>{title}</CardTextAndroid>
                ))}
            {children}
        </CardContainer>
    );
};

export default Card;
