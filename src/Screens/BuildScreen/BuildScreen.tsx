import { useTheme } from '@emotion/react';
import Card from 'Components/Card/Card';
import { ColourButtonGroup } from 'Components/ColourButtonGroup/ColourButtonGroup';
import ColourPicker from 'Components/ColourPicker/ColourPicker';
import HeaderBackground from 'Components/HeaderBackground/HeaderBackground';
import Icon from 'Components/Icon';
import Scheduler from 'Components/Scheduler/Scheduler';
import { AppContext } from 'Context/AppContext';
import {
    DEFAULT_HABIT,
    EVERYDAY_SCHEDULE,
    WEEKDAY_SCHEDULE,
    WEEKEND_SCHEDULE,
} from 'Controllers/HabitController/HabitConstants';
import { IHabit, ISchedule } from 'Controllers/HabitController/HabitController';
import { habitReducer } from 'Controllers/HabitController/HabitReducer';
import { BuildNavProps, BuildRouteProps } from 'Navigation/Params';
import React, { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getRandomColour, GradientColours } from 'Styles/Colours';
import { Row } from 'Styles/Globals';
import { v4 } from 'uuid';
import { BuildInput } from './BuildScreen.styles';
import { CountModule } from './Modules/CountModule';
import { SqaureButton } from './Modules/CountModule.styles';
import SaveModule from './Modules/SaveModule';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { ToastConfig } from 'Components/Toast/CustomToast';

interface BuildScreenProps {
    navigation: BuildNavProps;
    route: BuildRouteProps;
}

const scheduleFunctions = [EVERYDAY_SCHEDULE, WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE];

const BuildScreen: React.FC<BuildScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const { habits } = useContext(AppContext);
    const { id, icon } = route.params;

    // Dispatch to update habit state
    const initialHabit: IHabit = id ? habits[id] : { ...DEFAULT_HABIT, id: v4(), colour: getRandomColour() };
    const [habit, habitDispatch] = useReducer(habitReducer, initialHabit);

    // Updates the header to reflect the current gradient
    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground colour={habit.colour} />,
            headerTitle: id ? 'Edit Habit' : 'Create Habit',
        });
    }, [navigation, habit.colour, id]);

    // Updates habit icon if passed as a route parameter
    useEffect(() => {
        icon && habitDispatch({ type: 'icon', payload: { icon: icon } });
    }, [icon]);

    // Sets the schedule of the habit
    const setSchedule = useCallback((schedule: ISchedule) => {
        habitDispatch({ type: 'schedule', payload: { schedule: { ...schedule } } });
    }, []);

    // Specifies scheduling quick actions
    const setScheduleFunctions = useMemo(
        () =>
            scheduleFunctions.map(schedule => () => {
                ReactNativeHapticFeedback.trigger('impactLight');
                setSchedule(schedule);
            }),
        [setSchedule],
    );

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false} extraScrollHeight={60}>
            <View style={Row}>
                <TouchableOpacity onPress={() => navigation.navigate('Icon')}>
                    <Card>
                        <Icon family={habit.icon.family} name={habit.icon.name} size={28} colour={theme.grey} />
                    </Card>
                </TouchableOpacity>
                <Card style={{ marginLeft: 0, flex: 1 }}>
                    <BuildInput
                        colour={GradientColours[habit.colour].solid}
                        placeholder="Name"
                        placeholderTextColor={theme.grey}
                        returnKeyType="done"
                        onChangeText={name => habitDispatch({ type: 'name', payload: { name: name } })}
                        value={habit.name}
                    />
                </Card>
            </View>
            <Card title="Colour">
                <ColourPicker
                    updateGradient={gradient => habitDispatch({ type: 'colour', payload: { colour: gradient } })}
                />
            </Card>
            <Card title="Schedule">
                <Scheduler colour={habit.colour} schedule={{ ...habit.schedule }} setSchedule={setSchedule} />
                <ColourButtonGroup
                    colour={GradientColours[habit.colour].solid}
                    buttons={['Everyday', 'Weekdays', 'Weekend']}
                    buttonFunctions={setScheduleFunctions}
                />
            </Card>
            <View style={Row}>
                <Card title="Count" style={{ flex: 2, marginRight: 7.5 }}>
                    <CountModule habit={habit} habitDispatch={habitDispatch} />
                </Card>
                <Card title="Reminders" style={{ flex: 1.2, marginLeft: 7.5 }}>
                    <SqaureButton colour={GradientColours[habit.colour].solid} grey={false} style={{ width: '100%' }}>
                        <Icon
                            family="antdesign"
                            name="clockcircle"
                            size={24}
                            colour={GradientColours[habit.colour].solid}
                            style={{ zIndex: 1 }}
                        />
                    </SqaureButton>
                </Card>
            </View>
            <SaveModule habit={habit} navigation={navigation} />
            <Toast config={ToastConfig} ref={ref => Toast.setRef(ref)} />
        </KeyboardAwareScrollView>
    );
};

export default BuildScreen;
