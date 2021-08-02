import { useTheme } from '@emotion/react';
import { getTime } from 'Helpers/Habits';
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { BuildModalInput } from 'Screens/BuildScreen/BuildScreen.styles';
import { BodyFont } from 'Styles/Fonts';
import { RowCenter } from 'Styles/Globals';

interface BuildTimeModalProps {
    total: number;
    dispatchBuild: Dispatch<BuildAction>;
}

const BuildTimeModal: FC<BuildTimeModalProps> = ({ total, dispatchBuild }) => {
    const theme = useTheme();

    const { hours, minutes } = getTime(total);
    const [hourString, setHourString] = useState(hours);
    const [minuteString, setMinuteString] = useState(minutes);

    const handleChangeHours = (text: string): void => {
        const hours = Number(text.replace(/[^0-9]/g, ''));
        setHourString(hours);
    };

    const handleChangeMinutes = (text: string): void => {
        const minutes = Number(text.replace(/[^0-9]/g, ''));
        setMinuteString(minutes);
    };

    const handleEndEditing = useCallback(() => {
        dispatchBuild(buildActions.total(Number(hourString) * 3600 + Number(minuteString) * 60));
    }, [dispatchBuild, hourString, minuteString]);

    const _keyboardWillHide = useCallback(() => {
        setHourString(hourString + Math.floor(minuteString / 60));
        setMinuteString(prev => prev % 60);
    }, [hourString, minuteString]);

    useEffect(() => {
        Keyboard.addListener('keyboardWillHide', _keyboardWillHide);
        return () => {
            Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
        };
    }, [_keyboardWillHide]);

    return (
        <View style={[RowCenter, { padding: heightPercentageToDP(2), paddingTop: heightPercentageToDP(4) }]}>
            <BuildModalInput
                keyboardType="number-pad"
                returnKeyType="done"
                colour={theme.text}
                style={{ marginRight: 10 }}
                onChangeText={handleChangeHours}
                value={hourString > 0 ? String(hourString) : ''}
                onEndEditing={handleEndEditing}
            />
            <BodyFont style={{ marginRight: 30 }}>hours</BodyFont>
            <BuildModalInput
                keyboardType="number-pad"
                returnKeyType="done"
                colour={theme.text}
                style={{ marginRight: 10 }}
                onChangeText={handleChangeMinutes}
                value={minuteString > 0 ? String(minuteString) : ''}
                onEndEditing={handleEndEditing}
            />
            <BodyFont>mins</BodyFont>
        </View>
    );
};

export default BuildTimeModal;
