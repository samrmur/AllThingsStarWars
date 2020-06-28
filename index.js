/**
 * @format
 */

import 'react-native-gesture-handler';
import './i18n';
import {AppRegistry} from 'react-native';
import App from './src/App';
import Storybook from './storybook';
import {name as appName} from './app.json';

if (process.env.STORYBOOK == 'true') {
  AppRegistry.registerComponent(appName, () => Storybook);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
