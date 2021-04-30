import { Alert } from 'react-native';

export const deleteAlert = (onPress: () => void): void => {
    Alert.alert(
        'Delete',
        'Are you sure you want to delete this habit? This cannot be undone',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onPress,
            },
        ],
        { cancelable: false },
    );
};
