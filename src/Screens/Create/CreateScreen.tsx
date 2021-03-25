import Card from 'Components/Card/Card';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const CreateScreen: React.FC = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Card title="Yeet"></Card>
            <Text style={{ padding: 100 }}>Test</Text>
            <Text style={{ padding: 100 }}>Test</Text>
            <Text style={{ padding: 100 }}>Test</Text>
            <Text style={{ padding: 100 }}>Test</Text>
            <Text style={{ padding: 100 }}>Test</Text>
        </ScrollView>
    );
};

export default CreateScreen;
