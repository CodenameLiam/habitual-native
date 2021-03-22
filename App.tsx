import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from 'Navigation/AppNavigation';

// const Stack = createStackNavigator();

const App: React.FC = () => {
    // const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
    );
};

export default App;
