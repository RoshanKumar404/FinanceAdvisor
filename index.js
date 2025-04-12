import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

const headlessNotificationListener = async ({ notification }) => {
  console.log("🔔 Notification received!", notification);

  // Optional: save notification to state/storage
};

AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName, () => headlessNotificationListener);
AppRegistry.registerComponent(appName, () => App);
