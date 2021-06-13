import { Alert } from 'react-native';

export const timeAlert = (onPress: () => void): void => {
    Alert.alert(
        'Warning',
        'Going back will stop the timer. Are you sure you wish to continue?',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Stop Timer',
                style: 'destructive',
                onPress: onPress,
            },
        ],
        { cancelable: false },
    );
};
