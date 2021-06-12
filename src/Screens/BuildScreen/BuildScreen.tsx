import { useTheme } from '@emotion/react';
import Card from 'Components/Card/Card';
import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import ColourPicker from 'Components/ColourPicker/ColourPicker';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import Icon from 'Components/Icon';
import Scheduler from 'Components/Scheduler/Scheduler';
import { useHabits } from 'Context/AppContext';
import React, { useEffect, useMemo, useReducer } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Full, Row } from 'Styles/Globals';
import { v4 } from 'uuid';
import { SqaureButton } from 'Modules/BuildModules/BuildCount/CountModule.styles';
import Toast from 'react-native-toast-message';
import { ToastConfig } from 'Components/Toast/CustomToast';
import { BuildNavProps, BuildRouteProps } from 'Navigation/AppNavigation/AppNavigation.params';
import { DEFAULT_HABIT, EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE } from 'Types/Habit.constants';
import { HabitObject } from 'Types/Habit.types';
import { getRandomColour } from 'Helpers/RandomColour';
import { Gradients } from 'Styles/Colours';
import buildReducer from 'Reducers/BuildReducer/BuildReducer';
import { buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import BuildIcon from 'Modules/BuildModules/BuildIcon/BuildIcon';
import BuildInput from 'Modules/BuildModules/BuildInput/BuildInput';
import BuildSave from 'Modules/BuildModules/BuildSave/BuildSave';
import { CountModule } from 'Modules/BuildModules/BuildCount/CountModule';

interface BuildScreenProps {
    navigation: BuildNavProps;
    route: BuildRouteProps;
}

const scheduleFunctions = [EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE];

const BuildScreen: React.FC<BuildScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const [habits, dispatchHabits] = useHabits();
    const { id, icon } = route.params;

    // Dispatch to update habit state
    const initialHabit: HabitObject = id ? habits[id] : { ...DEFAULT_HABIT, id: v4(), colour: getRandomColour() };
    const [habit, dispatchBuild] = useReducer(buildReducer, initialHabit);

    // Specifies scheduling quick actions
    const setScheduleFunctions = useMemo(
        () => scheduleFunctions.map(schedule => () => dispatchBuild(buildActions.schedule(schedule))),
        [],
    );

    // Updates the header to reflect the current gradient
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: id ? 'Edit Habit' : 'Create Habit',
        });
    }, [navigation, habit.colour, id]);

    // Updates habit icon if passed as a route parameter
    useEffect(() => {
        icon && dispatchBuild(buildActions.icon(icon));
    }, [icon]);

    return (
        <KeyboardAwareScrollView contentContainerStyle={Full} scrollEnabled={false} extraScrollHeight={60}>
            <View style={Row}>
                <BuildIcon
                    navigation={navigation}
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
                    <SqaureButton colour={Gradients[habit.colour].solid} grey={false} style={{ width: '100%' }}>
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
        </KeyboardAwareScrollView>
    );
};

export default BuildScreen;
