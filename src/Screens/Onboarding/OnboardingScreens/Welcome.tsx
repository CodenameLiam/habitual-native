import styled from '@emotion/native';
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Gradients, ThemeColours } from 'Styles/Colours';
import { BodyFont, fontFamilyBold } from 'Styles/Fonts';
import { Full, FullCenter, Row } from 'Styles/Globals';

interface TitleProps {
    colour: string;
}

export const Title = styled.Text<TitleProps>`
    font-family: ${fontFamilyBold};
    font-size: 45px;
    color: ${props => props.colour};
`;

export const Ahead = styled.Text`
    margin: 10px;
    font-family: ${fontFamilyBold};
    font-size: 25px;
    color: ${ThemeColours.dark.text};
`;

export const SubTitle = styled(Ahead)`
    font-size: 18px;
`;

const Welcome: FC = () => {
    return (
        <View style={[FullCenter]}>
            <Ahead>Welcome to</Ahead>
            <View style={Row}>
                <Title colour={Gradients.MIDNIGHT.solid}>H</Title>
                <Title colour={Gradients.RED.solid}>A</Title>
                <Title colour={Gradients.ORANGE.solid}>B</Title>
                <Title colour={Gradients.TANGERINE.solid}>I</Title>
                <Title colour={Gradients.YELLOW.solid}>T</Title>
                <Title colour={Gradients.LIME.solid}>U</Title>
                <Title colour={Gradients.AQUA.solid}>A</Title>
                <Title colour={Gradients.BLUE.solid}>L</Title>
            </View>
            <SubTitle>The habit tracking app</SubTitle>
        </View>
    );
};

export default Welcome;
