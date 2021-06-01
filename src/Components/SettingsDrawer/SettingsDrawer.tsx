import { useTheme } from 'Context/AppContext';
import React, { FC } from 'react';
import { SafeAreaView, Switch } from 'react-native';
import { SettingsDrawerContainer, SettingsDrawerShadow } from './SettingsDrawer.styles';

const SettingsDrawer: FC = () => {
    const [theme, dispatchTheme] = useTheme();
    const dark = theme === 'DARK';
    return (
        <SettingsDrawerContainer>
            <SettingsDrawerShadow style={{ shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.3 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <Switch value={dark} onValueChange={() => dispatchTheme(dark ? 'LIGHT' : 'DARK')} />
            </SafeAreaView>
        </SettingsDrawerContainer>
    );
};

export default SettingsDrawer;
