import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from 'Navigation/AppNavigation';
import SettingsNavigation from 'Navigation/SettingsNavigation';

// const Stack = createStackNavigator();

const App: React.FC = () => {
    // const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <SettingsNavigation />
        </NavigationContainer>
    );
};

export default App;
