import { useTheme } from '@emotion/react';
import { Picker } from '@react-native-picker/picker';
import React, { FC, RefObject, useState } from 'react';
import { View, LayoutAnimation, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { Row, Full } from 'Styles/Globals';
import { HabitReminder } from 'Types/Habit.types';
import { getReminderHoursItems, getReminderMinutesItems, getReminderString } from './BuildReminderModal.functions';
import {
    ReminderButton,
    AddReminderPlus,
    BuildReminderModalContainer,
    ReminderTime,
    CancelReminder,
} from './BuildReminderModal.styles';
import { BodyFont } from 'Styles/Fonts';
import Icon from 'Components/Icon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Gradients } from 'Styles/Colours';
import { GrowContainer, GrowShadow } from 'Components/GrowScrollView/GrowScrollView.styles';

interface BuildReminderModalProps {
    colour: string;
    reminders: HabitReminder[];
    sheetRef: RefObject<BottomSheet>;
    dispatchBuild: (action: BuildAction) => void;
}

const BuildReminderModal: FC<BuildReminderModalProps> = ({ colour, sheetRef, reminders, dispatchBuild }) => {
    const theme = useTheme();

    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [time, setTime] = useState<'am' | 'pm'>('am');

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [editIndex, setEditIndex] = useState<number>();

    const handleShowTimePicker = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setEditIndex(undefined);
        setHour(10);
        setMinute(0);
        setTime('am');
        setShowTimePicker(!showTimePicker);
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleAddReminder = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (
            reminders.find(reminder => getReminderString(reminder) === getReminderString({ hour, minute, time })) ===
            undefined
        ) {
            dispatchBuild(buildActions.addReminder({ hour, minute, time }));
        }

        setShowTimePicker(false);
        ReactNativeHapticFeedback.trigger('notificationSuccess');
    };

    const handleDeleteReminder = (index: number): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatchBuild(buildActions.deleteReminder(index));
        editIndex !== undefined && setShowTimePicker(false);
        setEditIndex(undefined);
        ReactNativeHapticFeedback.trigger('impactMedium');
    };

    const handleEditReminder = (index: number, reminder: HabitReminder): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowTimePicker(true);
        setEditIndex(index);
        setHour(reminder.hour);
        setMinute(reminder.minute);
        setTime(reminder.time);
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleConfirmEditReminder = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        editIndex !== undefined && dispatchBuild(buildActions.editReminder(editIndex, { hour, minute, time }));
        setEditIndex(undefined);
        setShowTimePicker(false);
        ReactNativeHapticFeedback.trigger('notificationSuccess');
    };

    return (
        <BuildReminderModalContainer>
            <GrowContainer>
                <ScrollView
                    waitFor={sheetRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 25, paddingLeft: 10, paddingRight: 10 }}
                >
                    {reminders.map((reminder, index) => {
                        const reminderString = getReminderString(reminder);
                        return (
                            <ReminderTime
                                key={reminderString}
                                colour={theme.background}
                                onPress={() => handleEditReminder(index, reminder)}
                            >
                                <BodyFont>{reminderString}</BodyFont>
                                <TouchableOpacity
                                    onPress={() => handleDeleteReminder(index)}
                                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                >
                                    <Icon family="feather" name="trash-2" size={24} colour={theme.text} />
                                </TouchableOpacity>
                            </ReminderTime>
                        );
                    })}
                </ScrollView>
                <GrowShadow
                    colour={theme.card}
                    style={{
                        shadowColor: theme.card,
                        shadowRadius: 2,
                        shadowOpacity: 1,
                        shadowOffset: { height: -5, width: 0 },
                    }}
                />
            </GrowContainer>
            {!showTimePicker && (
                <View style={Row}>
                    <ReminderButton colour={colour} onPress={handleShowTimePicker}>
                        <Icon family="fontawesome" name="plus" size={24} colour={theme.text} style={AddReminderPlus} />
                        <BodyFont>Add Reminder</BodyFont>
                    </ReminderButton>
                </View>
            )}

            {showTimePicker && (
                <View>
                    <View style={Row}>
                        <Picker style={Full} selectedValue={hour} onValueChange={itemValue => setHour(itemValue)}>
                            {getReminderHoursItems(theme.text)}
                        </Picker>
                        <Picker style={Full} selectedValue={minute} onValueChange={itemValue => setMinute(itemValue)}>
                            {getReminderMinutesItems(theme.text)}
                        </Picker>
                        <Picker style={Full} selectedValue={time} onValueChange={itemValue => setTime(itemValue)}>
                            <Picker.Item value={'am'} label={'am'} color={theme.text} />
                            <Picker.Item value={'pm'} label={'pm'} color={theme.text} />
                        </Picker>
                    </View>
                    <View style={Row}>
                        <ReminderButton
                            colour={Gradients.RED.solid}
                            onPress={handleShowTimePicker}
                            style={CancelReminder}
                        >
                            <BodyFont>Cancel</BodyFont>
                        </ReminderButton>
                        <ReminderButton
                            colour={Gradients.GREEN.start}
                            onPress={() =>
                                editIndex !== undefined ? handleConfirmEditReminder() : handleAddReminder()
                            }
                        >
                            <BodyFont>Confirm</BodyFont>
                        </ReminderButton>
                    </View>
                </View>
            )}
        </BuildReminderModalContainer>
    );
};

export default BuildReminderModal;
