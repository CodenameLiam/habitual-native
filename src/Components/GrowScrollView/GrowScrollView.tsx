import { HabitScroll } from 'Components/Habit/Habit.styles';
import React, { FC } from 'react';
import { View, Text, ScrollView, StyleProp, ViewStyle } from 'react-native';
import {
    GrowContainer,
    GrowScrollContainer,
    GrowScrollContent,
    GrowShadow,
} from 'Components/GrowScrollView/GrowScrollView.styles';
import { useTheme } from '@emotion/react';

interface GrowScrollViewProps {
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const GrowScrollView: FC<GrowScrollViewProps> = ({ children, contentContainerStyle }) => {
    const theme = useTheme();

    return (
        <GrowContainer>
            <GrowShadow
                top
                style={{
                    shadowColor: theme.background,
                    shadowRadius: 2,
                    shadowOpacity: 1,
                    shadowOffset: { height: 5, width: 0 },
                }}
            />
            <GrowScrollContainer
                contentContainerStyle={[contentContainerStyle, GrowScrollContent]}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </GrowScrollContainer>
            <GrowShadow
                style={{
                    shadowColor: theme.background,
                    shadowRadius: 2,
                    shadowOpacity: 1,
                    shadowOffset: { height: -5, width: 0 },
                }}
            />
        </GrowContainer>
    );
};

export default GrowScrollView;
