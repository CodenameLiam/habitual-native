import { HabitScroll } from 'Components/Habit/Habit.styles';
import React, { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GrowScrollContainer, GrowScrollContent } from 'Components/GrowScrollView/GrowScrollView.styles';

const GrowScrollView: FC = ({ children }) => (
    <GrowScrollContainer contentContainerStyle={GrowScrollContent} showsVerticalScrollIndicator={false}>
        {children}
    </GrowScrollContainer>
);

export default GrowScrollView;
