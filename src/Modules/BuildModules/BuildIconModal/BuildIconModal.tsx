import { useTheme } from '@emotion/react';
import Icon from 'Components/Icon';
import React, { FC, RefObject } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconOptions } from './BuildIconModal.constants';
import { IconContainer, IconGroupContainer, Label, LabelContainer, Row } from './BuildIconModal.styles';
import BottomSheet from 'reanimated-bottom-sheet';
import { HabitIcon } from 'Components/Icon/Icon.types';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';

const IconDimensions = (Dimensions.get('screen').width - 30) / 10.5;

interface BuildIconModalProps {
    sheetRef: RefObject<BottomSheet>;
    handleClose: () => void;
    dispatchBuild: (action: BuildAction) => void;
}

const BuildIconModal: FC<BuildIconModalProps> = ({ sheetRef, handleClose, dispatchBuild }) => {
    const theme = useTheme();

    const handlePress = (icon: HabitIcon): void => {
        dispatchBuild(buildActions.icon(icon));
        handleClose();
    };

    return (
        <ScrollView
            waitFor={sheetRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            {IconOptions.map((group, index) => (
                <IconGroupContainer key={group.label}>
                    <LabelContainer>
                        <Label style={{ borderRadius: 10 }}>{group.label}</Label>
                    </LabelContainer>
                    <Row>
                        {group.icons.map((icon, index) => (
                            <IconContainer key={index + icon.name} onPress={() => handlePress(icon)}>
                                <Icon family={icon.family} name={icon.name} colour={theme.text} size={IconDimensions} />
                            </IconContainer>
                        ))}
                    </Row>
                </IconGroupContainer>
            ))}
        </ScrollView>
    );
};

export default BuildIconModal;
