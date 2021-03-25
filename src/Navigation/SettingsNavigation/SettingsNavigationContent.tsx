import { SettingsNavigationProps } from 'Navigation';
import React from 'react';
import { SafeAreaView, Switch } from 'react-native';
import { SettingsDrawerParent, SettingsDrawerShaddow } from './SettingsNavigation.styles';

const SettingsNavigationContent: React.FC<SettingsNavigationProps> = ({ darkTheme, setTheme }) => {
    const toggleDarkTheme = (): void => setTheme(darkTheme ? 'light' : 'dark');

    return (
        <SettingsDrawerParent>
            <SettingsDrawerShaddow style={{ shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.3 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <Switch value={darkTheme} onValueChange={toggleDarkTheme} />
            </SafeAreaView>
        </SettingsDrawerParent>
    );
};

export default SettingsNavigationContent;
