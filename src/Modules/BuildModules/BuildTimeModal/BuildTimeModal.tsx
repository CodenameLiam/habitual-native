import { useTheme } from '@emotion/react';
// import { Picker } from '@react-native-picker/picker';
import { getTime } from 'Helpers/Habits';
import React, { Dispatch, FC, useState } from 'react';
import { View } from 'react-native';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { Full, Row } from 'Styles/Globals';
// import { getHoursItems, getMinutesItems } from './BuildTimeModal.functions';

interface BuildTimeModalProps {
    total: number;
    dispatchBuild: Dispatch<BuildAction>;
}

const BuildTimeModal: FC<BuildTimeModalProps> = ({ total, dispatchBuild }) => {
    const theme = useTheme();

    const { hours, minutes } = getTime(total);
    const [hourPicker, setHourPicker] = useState(hours);
    const [minutePicker, setMinutePicker] = useState(minutes);

    const handleChangeHours = (hours: number): void => {
        setHourPicker(hours);
        dispatchBuild(buildActions.total(hours * 3600 + minutes * 60));
    };

    const handleChangeMinutes = (minutes: number): void => {
        setMinutePicker(minutes);
        dispatchBuild(buildActions.total(hours * 3600 + minutes * 60));
    };

    return (
        <View style={Row}>
            {/* <Picker style={Full} selectedValue={hourPicker} onValueChange={itemValue => handleChangeHours(itemValue)}>
                {getHoursItems(theme.text)}
            </Picker>
            <Picker
                style={Full}
                selectedValue={minutePicker}
                onValueChange={itemValue => handleChangeMinutes(itemValue)}
            >
                {getMinutesItems(theme.text)}
            </Picker> */}
        </View>
    );
};

export default BuildTimeModal;
