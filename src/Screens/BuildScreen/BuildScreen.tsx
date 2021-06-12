import React, { useEffect, useMemo, useReducer, useRef, FC, useCallback, useState, Fragment } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View, Dimensions } from 'react-native';
import { useHabits } from 'Context/AppContext';
import { useTheme } from '@emotion/react';
import { buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { v4 } from 'uuid';
import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import { CountModule } from 'Modules/BuildModules/BuildCount/CountModule';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Full, Row } from 'Styles/Globals';
import { SqaureButton } from 'Modules/BuildModules/BuildCount/CountModule.styles';
import ColourPicker from 'Components/ColourPicker/ColourPicker';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import Icon from 'Components/Icon';
import Scheduler from 'Components/Scheduler/Scheduler';
import Card from 'Components/Card/Card';
import Toast from 'react-native-toast-message';
import { ToastConfig } from 'Components/Toast/CustomToast';
import { BuildNavProps, BuildRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { DEFAULT_HABIT, EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE } from 'Types/Habit.constants';
import { HabitObject } from 'Types/Habit.types';
import { getRandomColour } from 'Helpers/RandomColour';
import { Gradients } from 'Styles/Colours';
import BottomSheet from 'reanimated-bottom-sheet';
import buildReducer from 'Reducers/BuildReducer/BuildReducer';
import BuildIcon from 'Modules/BuildModules/BuildIcon/BuildIcon';
import BuildInput from 'Modules/BuildModules/BuildInput/BuildInput';
import BuildSave from 'Modules/BuildModules/BuildSave/BuildSave';
import Animated from 'react-native-reanimated';
import styled from '@emotion/native';
import { BuildScreenSnapPoints, useBuildModal } from './BuildScreen.functions';
import {
    BuildModalContainer,
    BuildModalContent,
    BuildModalHandle,
    BuildModalHeader,
    BuildModalShadow,
} from 'Modules/BuildModules/BuildModal/BuildModal.styles';
import { GrowScrollContainer } from 'Components/GrowScrollView/GrowScrollView.styles';
import { ScrollView } from 'react-native-gesture-handler';
import BuildShadow from 'Modules/BuildModules/BuildShadow/BuildShadow';
import BuildIconModal from 'Modules/BuildModules/BuildIconModal/BuildIconModal';

const scheduleFunctions = [EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE];
interface BuildScreenProps {
    navigation: BuildNavProps;
    route: BuildRouteProps;
}

const BuildScreen: React.FC<BuildScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const [habits, dispatchHabits] = useHabits();
    const { id, icon } = route.params;

    // Dispatch to update habit state
    const initialHabit: HabitObject = id ? habits[id] : { ...DEFAULT_HABIT, id: v4(), colour: getRandomColour() };
    const [habit, dispatchBuild] = useReducer(buildReducer, initialHabit);

    // Updates the header to reflect the current gradient
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: id ? 'Edit Habit' : 'Create Habit',
        });
    }, [navigation, habit.colour, id]);

    // Updates habit icon if passed as a route parameter
    // useEffect(() => {
    //     icon && dispatchBuild(buildActions.icon(icon));
    // }, [icon]);

    // Specifies scheduling quick actions
    const setScheduleFunctions = useMemo(
        () => scheduleFunctions.map(schedule => () => dispatchBuild(buildActions.schedule(schedule))),
        [],
    );

    // Modal actions and state
    const { modal, setModal, sheetRef, shadowRef, handleOpen, handleClose } = useBuildModal(navigation);

    return (
        <KeyboardAwareScrollView contentContainerStyle={Full} scrollEnabled={false} extraScrollHeight={60}>
            <View style={Row}>
                <BuildIcon
                    onPress={() => {
                        setModal('Icon');
                        handleOpen();
                    }}
                    family={habit.icon.family}
                    name={habit.icon.name}
                    colour={theme.grey}
                />
                <BuildInput
                    colour={Gradients[habit.colour].solid}
                    placeholderColour={theme.grey}
                    value={habit.name}
                    dispatchBuild={dispatchBuild}
                />
            </View>
            <Card title="Colour">
                <ColourPicker updateGradient={gradient => dispatchBuild(buildActions.colour(gradient))} />
            </Card>
            <Card title="Schedule">
                <Scheduler colour={habit.colour} schedule={{ ...habit.schedule }} dispatchBuild={dispatchBuild} />
                <ColourButtonGroup
                    colour={Gradients[habit.colour].solid}
                    buttons={['Everyday', 'Weekdays', 'Weekend']}
                    buttonFunctions={setScheduleFunctions}
                />
            </Card>
            <View style={Row}>
                <Card title="Count" style={{ flex: 2, marginRight: 7.5 }}>
                    <CountModule habit={habit} dispatchBuild={dispatchBuild} />
                </Card>
                <Card title="Reminders" style={{ flex: 1.2, marginLeft: 7.5 }}>
                    <SqaureButton
                        colour={Gradients[habit.colour].solid}
                        grey={false}
                        style={{ width: '100%' }}
                        onPress={() => {
                            setModal('Time');
                            handleOpen();
                        }}
                    >
                        <Icon
                            family="ion"
                            name="notifications"
                            size={26}
                            colour={Gradients[habit.colour].solid}
                            style={{ zIndex: 1 }}
                        />
                    </SqaureButton>
                </Card>
            </View>
            <BuildSave habit={habit} dispatchHabits={dispatchHabits} navigation={navigation} />
            <Toast config={ToastConfig} ref={ref => Toast.setRef(ref)} />
            <BuildShadow shadow={shadowRef} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={['100%', 0]}
                initialSnap={1}
                callbackNode={shadowRef}
                onCloseEnd={handleClose}
                renderContent={() => (
                    <BuildModalContainer>
                        <TouchableWithoutFeedback onPress={handleClose}>
                            <View style={Full} />
                        </TouchableWithoutFeedback>
                        <BuildModalContent height={BuildScreenSnapPoints[modal]}>
                            <BuildModalHeader
                                style={{
                                    shadowColor: theme.card,
                                    shadowRadius: 3,
                                    shadowOpacity: 1,
                                    shadowOffset: { height: 5, width: 0 },
                                }}
                            >
                                <BuildModalHandle />
                            </BuildModalHeader>
                            {
                                {
                                    Mount: <Fragment></Fragment>,
                                    Icon: (
                                        <BuildIconModal
                                            sheetRef={sheetRef}
                                            dispatchBuild={dispatchBuild}
                                            handleClose={handleClose}
                                        />
                                    ),
                                    Time: <Text>This is time screen</Text>,
                                }[modal]
                            }
                        </BuildModalContent>
                    </BuildModalContainer>
                )}
            />
        </KeyboardAwareScrollView>
    );
};

export default BuildScreen;
