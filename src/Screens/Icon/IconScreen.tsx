import { useTheme } from '@emotion/react';
import DismissableScrollView from 'Components/DismissableScrollView/DismissableScrollView';
import Icon, { IconProps } from 'Components/Icon';
import { IconNavProps } from 'Navigation/Params';
import React, { useEffect, useState } from 'react';
import { InteractionManager, Dimensions } from 'react-native';
import { IconOptions } from './IconConstants';
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

const IconDimensions = Dimensions.get('screen').width / 10.2;

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
        <DismissableScrollView navigation={navigation}>
            <IconScreenContainer>
                {IconOptions.map((group, index) => (
                    <IconGroupContainer key={group.label}>
                        <LabelContainer>
                            <Label>{group.label}</Label>
                        </LabelContainer>
                        {((!isReady && index < 2) || isReady) && (
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
        </DismissableScrollView>
    );
};

export default IconScreen;
