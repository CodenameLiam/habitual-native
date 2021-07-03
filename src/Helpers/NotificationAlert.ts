import { Alert } from 'react-native';

export const notificationAlert = (onPress: () => void): void => {
    Alert.alert(
        'Notifications Disabled',
        'Please enable notifications to set up habit reminders',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Open Settings',
                style: 'default',
                onPress: onPress,
            },
        ],
        { cancelable: false },
    );
};
