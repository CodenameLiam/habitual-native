import { useTheme } from '@emotion/react';
import React, { FC, RefObject, useState } from 'react';
import { View, LayoutAnimation, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { Row, RowCenter } from 'Styles/Globals';
import { HabitReminder } from 'Types/Habit.types';
import { getReminderString, zeroPad } from './BuildReminderModal.functions';
import {
    ReminderButton,
    AddReminderPlus,
    BuildReminderModalContainer,
    ReminderTime,
    ReminderTimeButton,
    ReminderInput,
} from './BuildReminderModal.styles';
import { BodyFont } from 'Styles/Fonts';
import Icon from 'Components/Icon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { GrowContainer, GrowShadow } from 'Components/GrowScrollView/GrowScrollView.styles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Gradient, Gradients } from 'Styles/Colours';
import LinearGradient from 'react-native-linear-gradient';

interface BuildReminderModalProps {
    colour: string;
    gradient: Gradient;
    reminders: HabitReminder[];
    sheetRef: RefObject<BottomSheet>;
    dispatchBuild: (action: BuildAction) => void;
}

const BuildReminderModal: FC<BuildReminderModalProps> = ({ colour, gradient, sheetRef, reminders, dispatchBuild }) => {
    const theme = useTheme();

    const [timeString, setTimeString] = useState('');
    const [time, setTime] = useState<'am' | 'pm'>('am');

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [editIndex, setEditIndex] = useState<number>();

    const handleShowTimePicker = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setEditIndex(undefined);
        setTimeString('');
        setTime('am');
        setShowTimePicker(!showTimePicker);
        ReactNativeHapticFeedback.trigger('impactLight');
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
        setTimeString(`${String(reminder.hour)}:${zeroPad(reminder.minute)}`);
        setTime(reminder.time);
        ReactNativeHapticFeedback.trigger('impactLight');
    };

    const handleConfirmEditReminder = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if ((timeString[0] === '1' && timeString.length === 5) || timeString.length === 4) {
            const [hours, minutes] = timeString.split(':');

            const hour = Number(hours) > 1 ? Number(hours) : 12;
            const minute = Number(minutes);

            if (
                reminders.find(
                    reminder => getReminderString(reminder) === getReminderString({ hour, minute, time }),
                ) === undefined
            ) {
                if (editIndex === undefined) {
                    dispatchBuild(
                        buildActions.addReminder({
                            hour,
                            minute,
                            time,
                        }),
                    );
                } else {
                    dispatchBuild(
                        buildActions.editReminder(editIndex, {
                            hour,
                            minute,
                            time,
                        }),
                    );
                }
            }

            ReactNativeHapticFeedback.trigger('notificationSuccess');
        }
        setShowTimePicker(false);
    };

    return (
        <BuildReminderModalContainer>
            <GrowContainer>
                {showTimePicker ? (
                    <View style={[RowCenter, { paddingTop: heightPercentageToDP(4) }]}>
                        <ReminderInput
                            colour={theme.text}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            autoFocus
                            value={timeString}
                            mask={text => {
                                if (text?.charAt(0) === '1') {
                                    return [/\d/, /\d/, ':', /[0-5]/, /\d/];
                                } else {
                                    return [/\d/, ':', /[0-5]/, /\d/];
                                }
                            }}
                            placeholder="8:00"
                            placeholderTextColor={theme.grey}
                            onChangeText={setTimeString}
                            accessibilityComponentType
                            accessibilityTraits
                            onEndEditing={handleConfirmEditReminder}
                        />
                        <ReminderTimeButton
                            colour={time === 'am' ? colour : theme.background}
                            onPress={() => setTime('am')}
                        >
                            {time === 'am' && (
                                <LinearGradient
                                    colors={[gradient.start, gradient.end]}
                                    style={StyleSheet.absoluteFill}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                            )}
                            <BodyFont>AM</BodyFont>
                        </ReminderTimeButton>
                        <ReminderTimeButton
                            colour={time === 'pm' ? colour : theme.background}
                            onPress={() => setTime('pm')}
                        >
                            {time === 'pm' && (
                                <LinearGradient
                                    colors={[gradient.start, gradient.end]}
                                    style={StyleSheet.absoluteFill}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                            )}
                            <BodyFont>PM</BodyFont>
                        </ReminderTimeButton>
                    </View>
                ) : (
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
                )}
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
                        <LinearGradient
                            colors={[gradient.start, gradient.end]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                        <Icon family="fontawesome" name="plus" size={24} colour={theme.text} style={AddReminderPlus} />
                        <BodyFont>Add Reminder</BodyFont>
                    </ReminderButton>
                </View>
            )}

            {/* {showTimePicker && (
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
            )} */}
        </BuildReminderModalContainer>
    );
};

export default BuildReminderModal;
