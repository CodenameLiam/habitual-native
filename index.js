/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import 'react-native-gesture-handler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
        PushNotification.removeAllDeliveredNotifications();

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
});

PushNotification.createChannel(
    {
        channelId: 'habitual', // (required)
        channelName: 'Habitual', // (required)
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
