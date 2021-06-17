import React, { useEffect, useMemo, useReducer, Fragment, FC } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useHabits } from 'Context/AppContext';
import { useTheme } from '@emotion/react';
import { buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
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
import { EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE } from 'Types/Habit.constants';
import { Gradients } from 'Styles/Colours';
import BottomSheet from 'reanimated-bottom-sheet';
import buildReducer from 'Reducers/BuildReducer/BuildReducer';
import BuildIcon from 'Modules/BuildModules/BuildIcon/BuildIcon';
import BuildInput from 'Modules/BuildModules/BuildInput/BuildInput';
import BuildSave from 'Modules/BuildModules/BuildSave/BuildSave';
import { BuildScreenSnapPoints, getInitialHabit, useBuildModal } from './BuildScreen.functions';
import {
    BuildModalContainer,
    BuildModalContent,
    BuildModalHandle,
    BuildModalHeader,
} from 'Modules/BuildModules/BuildModal/BuildModal.styles';
import BuildShadow from 'Modules/BuildModules/BuildShadow/BuildShadow';
import BuildIconModal from 'Modules/BuildModules/BuildIconModal/BuildIconModal';
import { CardContainerCircle } from 'Components/Card/Card.styles';
import TimeModule from 'Modules/BuildModules/BuildTime/TimeModule';
import BuildTimeModal from 'Modules/BuildModules/BuildTimeModal/BuildTimeModal';

const scheduleFunctions = [EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE];
interface BuildScreenProps {
    navigation: BuildNavProps;
    route: BuildRouteProps;
}

const BuildScreen: FC<BuildScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const [habits, dispatchHabits] = useHabits();
    const { id } = route.params;

    // Dispatch to update habit state
    const [habit, dispatchBuild] = useReducer(buildReducer, getInitialHabit(habits, id));
    const gradient = useMemo(() => Gradients[habit.colour], [habit.colour]);

    // Updates the header to reflect the current gradient
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: id ? 'Edit Habit' : 'Create Habit',
        });
    }, [navigation, habit.colour, id]);

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
                {/* Icon */}
                <BuildIcon
                    onPress={() => {
                        setModal('Icon');
                        handleOpen();
                    }}
                    family={habit.icon.family}
                    name={habit.icon.name}
                    colour={theme.grey}
                />
                {/* Name */}
                <BuildInput
                    colour={gradient.solid}
                    placeholderColour={theme.grey}
                    value={habit.name}
                    dispatchBuild={dispatchBuild}
                />
                {/* Reminders */}
                <TouchableOpacity
                    onPress={() => {
                        setModal('Reminder');
                        handleOpen();
                    }}
                >
                    <CardContainerCircle>
                        <Icon family="ion" name="notifications" size={32} colour={theme.grey} />
                    </CardContainerCircle>
                </TouchableOpacity>
            </View>
            {/* Colour */}
            <Card title="Colour">
                <ColourPicker updateGradient={gradient => dispatchBuild(buildActions.colour(gradient))} />
            </Card>
            {/* Schedule */}
            <Card title="Schedule">
                <Scheduler colour={habit.colour} schedule={{ ...habit.schedule }} dispatchBuild={dispatchBuild} />
                <ColourButtonGroup
                    colour={gradient.solid}
                    buttons={['Everyday', 'Weekdays', 'Weekend']}
                    buttonFunctions={setScheduleFunctions}
                />
            </Card>
            <View style={Row}>
                {/* Units */}
                <Card title="Units" style={{ flex: 1.2, marginRight: 7.5 }}>
                    <View style={[Row]}>
                        <SqaureButton
                            colour={gradient.solid}
                            grey={habit.type === 'time'}
                            style={{ flex: 1, marginRight: 10 }}
                            onPress={() => dispatchBuild(buildActions.type('count'))}
                        >
                            <Icon
                                family="fontawesome"
                                name="plus"
                                size={24}
                                colour={habit.type === 'count' ? gradient.solid : theme.grey}
                            />
                        </SqaureButton>
                        <SqaureButton
                            colour={gradient.solid}
                            grey={habit.type === 'count'}
                            style={{ flex: 1 }}
                            onPress={() => dispatchBuild(buildActions.type('time'))}
                        >
                            <Icon
                                family="antdesign"
                                name="clockcircle"
                                size={24}
                                colour={habit.type === 'time' ? gradient.solid : theme.grey}
                            />
                        </SqaureButton>
                    </View>
                </Card>
                {/* Total */}
                <Card title={habit.type === 'count' ? 'Total' : 'Time'} style={{ flex: 2, marginLeft: 7.5 }}>
                    {habit.type === 'count' ? (
                        <CountModule habit={habit} dispatchBuild={dispatchBuild} />
                    ) : (
                        <TimeModule
                            total={habit.total}
                            colour={gradient.solid}
                            onPress={() => {
                                setModal('Time');
                                handleOpen();
                            }}
                        />
                    )}
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
                                    Reminder: <Text>This is reminder screen</Text>,
                                    Time: <BuildTimeModal total={habit.total} dispatchBuild={dispatchBuild} />,
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
