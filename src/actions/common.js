// import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
// import { ToastAndroid } from 'react-native';
import {
  ALERT_CLOSED,
  ALERT_OPENED,
  FONTS_LOADED,
  LOCALE_LOADED,
} from './types';
import I18n from '../i18n';

export function showAlert({
  body,
  primaryAction,
  primaryText,
  secondaryAction,
  secondaryText,
  subText,
  title,
}) {
  return (dispatch) => {
    dispatch({
      body,
      primaryAction,
      primaryText,
      secondaryAction,
      secondaryText,
      subText,
      title,
      type: ALERT_OPENED,
    });
  };
}

export function hideAlert() {
  return (dispatch) => {
    dispatch({ type: ALERT_CLOSED });
  };
}

export function verifyChangesAlert({ changesMade, i18n, navigation }) {
  return (dispatch) => {
    if (changesMade) {
      showAlert({
        body: i18n.discardAlert.changesWillNotSaved,
        primaryAction: () => hideAlert()(dispatch),
        primaryText: i18n.discardAlert.stay,
        secondaryAction: () => {
          hideAlert()(dispatch);
          navigation.goBack();
        },
        secondaryText: i18n.discardAlert.discard,
        title: i18n.discardAlert.discardChanges,
      })(dispatch);
    } else {
      navigation.goBack();
    }
  };
}

export function loadLocale() {
  return async (dispatch) => {
    const i18n = I18n[Localization.locale] || I18n.en_US;

    dispatch({ i18n, type: LOCALE_LOADED });
    // await loadFonts();
    dispatch({ type: FONTS_LOADED });
  };
}
