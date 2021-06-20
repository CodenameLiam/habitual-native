/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import 'react-native-gesture-handler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },
});

AppRegistry.registerComponent(appName, () => App);
