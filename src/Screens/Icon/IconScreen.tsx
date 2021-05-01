import { useTheme } from '@emotion/react';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import Icon, { IconProps } from 'Components/Icon';
import { IconNavProps } from 'Navigation/Params';
import React, { useEffect, useState } from 'react';
import { InteractionManager, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconOptions } from './IconScreen.constants';
import {
    IconContainer,
    IconGroupContainer,
    IconScreenContainer,
    Label,
    LabelContainer,
    Row,
} from './IconScreen.styles';

interface IconScreenProps {
    navigation: IconNavProps;
}

const IconDimensions = (Dimensions.get('screen').width - 20) / 10.5;

const IconScreen: React.FC<IconScreenProps> = ({ navigation }) => {
    const theme = useTheme();

    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsReady(true);
        });
    }, []);

    const handlePress = (icon: Partial<IconProps>): void => {
        navigation.navigate('Build', { icon: icon });
        // impactAsync(ImpactFeedbackStyle.Light);
    };

    return (
        // <DismissableScrollView navigation={navigation}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <IconScreenContainer>
                {IconOptions.map((group, index) => (
                    <IconGroupContainer key={group.label}>
                        <LabelContainer>
                            <Label style={{ borderRadius: 10 }}>{group.label}</Label>
                        </LabelContainer>
                        {((!isReady && index < 3) || isReady) && (
                            <Row>
                                {group.icons.map((icon, index) => (
                                    <IconContainer key={index + icon.name} onPress={() => handlePress(icon)}>
                                        <Icon
                                            family={icon.family}
                                            name={icon.name}
                                            colour={theme.text}
                                            size={IconDimensions}
                                        />
                                    </IconContainer>
                                ))}
                            </Row>
                        )}
                    </IconGroupContainer>
                ))}
            </IconScreenContainer>
        </ScrollView>
    );
};

export default IconScreen;
