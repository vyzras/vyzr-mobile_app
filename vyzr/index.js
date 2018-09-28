/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
  GLOBAL.FormData = GLOBAL.originalFormData ? GLOBAL.originalFormData : GLOBAL.FormData;
  GLOBAL.Blob = GLOBAL.originalBlob ? GLOBAL.originalBlob : GLOBAL.Blob;
  GLOBAL.FileReader = GLOBAL.originalFileReader ? GLOBAL.originalFileReader : GLOBAL.FileReader;
}

AppRegistry.registerComponent(appName, () => App);
