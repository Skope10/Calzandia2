import React from 'react';
import * as geolib from 'geolib';
import { Dimensions, StyleSheet, View } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Moment from 'moment';
//import ENV from './env';
//import app from '../app.json';

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;

const STORAGE_KEY_NAME = '@MyPetCloud:';

const generalStyles = StyleSheet.create({
  screenHeader: {
    borderBottomWidth: 2,
    borderColor: '#dfdfe1',
    elevation: 0,
    height: 44,
    marginTop: getStatusBarHeight(),
  },

  screenHeaderTitle: {
    color: '#202020',
    flex: 1,
    fontFamily: 'sfui-text-regular',
    fontSize: 16,
    fontWeight: 'normal',
    letterSpacing: 1.5,
    paddingLeft: 2.3,
    textAlign: 'center',
  },
});

export const defaultScreenNavigationOptions = {
  headerRight: <View />,
  headerStyle: generalStyles.screenHeader,
  headerTitleStyle: generalStyles.screenHeaderTitle,
};

function getAppVersion() {
  const versionNumber = app.expo.version;
  const { releaseChannel } = app.expo;
  let suffix;

  if (!releaseChannel || releaseChannel.indexOf('dev') > -1) {
    suffix = '-dev';
  } else if (releaseChannel.indexOf('qa') > -1) {
    suffix = '-qa';
  } else if (releaseChannel.indexOf('staging') > -1) {
    suffix = '-st';
  } else if (releaseChannel.indexOf('t2') > -1) {
    suffix = '-t2';
  } else {
    suffix = '';
  }

  return `v${versionNumber}${suffix}`;
}

export const APP_VERSION = getAppVersion();

export function generateShareUrl(postId) {
  const url = ENV.API_URL.replace('figo', 'Post/Share/');
  return `${url}${postId}`;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;

  return function f(...args) {
    const context = this;

    function later() {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export function doNothing() {
  // Does exactly what it promises.
  // ... what is "nothing" anyway? https://bit.ly/2Hwo3Vj
}

// separateThousands(1200000) === '1,200,000'
// separateThousands(100000.12) === '100,000.12'
export function separateThousands(num) {
  const [intPart, decimals] = String(num).split('.');
  const formattedInt = intPart.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
  const formattedDec = decimals ? `.${decimals}` : '';

  return `${formattedInt}${formattedDec}`;
}

export function validateEmail(email) {
  const regexString = '^[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)*@'
    + '[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)*\\.[a-zA-Z]{2,4}$';
  const regex = new RegExp(regexString);

  return regex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(String(password).toLowerCase());
}

// serializeForUri({ param0: 'value 0', param1: 'value:1' }) ===
// 'param0=value%200&param1=value%3A1'
export function serializeForUri(obj = {}) {
  return Object
    .keys(obj)
    .map((key) => `${encodeURI(key)}=${encodeURI(obj[key])}`)
    .join('&');
}

export function genApiUrl(path, params) {
  let serializedParams = serializeForUri(params);

  if (serializedParams) {
    serializedParams = `?${serializedParams}`;
  }

  return `${ENV.API_URL}/${path}${serializedParams}`;
}

export function genUNAUrl(path, params) {
  let serializedParams = serializeForUri(params);

  if (serializedParams) {
    serializedParams = `?${serializedParams}`;
  }

  return `${ENV.UNA_URL}/${path}${serializedParams}`;
}

export function genericKeyExtractor(_, index) {
  return String(index);
}

export function getDistance({ from, i18n, to }) {
  return i18n.distance.unitFactor * geolib.getDistance(from, to);
}

export function getDistanceString(args) {
  return `${getDistance(args).toFixed(1)} ${args.i18n.distance.unitSuffix}`;
}

// unSnakify('multiple_words_string') === 'Multiple Words String'
export function unSnakify(string) {
  return string
    .split('_')
    .map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
    .join(' ');
}

export function getMonthName(i18n, monthNumber) {
  const { months } = i18n;
  switch (Number(monthNumber)) {
    case 1:
      return months.january;
    case 2:
      return months.february;
    case 3:
      return months.march;
    case 4:
      return months.april;
    case 5:
      return months.may;
    case 6:
      return months.june;
    case 7:
      return months.july;
    case 8:
      return months.august;
    case 9:
      return months.september;
    case 10:
      return months.october;
    case 11:
      return months.november;
    case 12:
      return months.december;
    default:
      return '';
  }
}

export function maskPhoneNumber(string) {
  let phone = string.replace(/[^0-9]/g, '');
  const areaCodeMatch = /^(\d{3})(?=\d+)/.exec(phone);
  const firstPartMatch = /^\d{3}(\d{1,3})/.exec(phone);
  const secondPartMatch = /^\d{6}(\d{1,4})/.exec(phone);

  if (areaCodeMatch) {
    phone = `(${areaCodeMatch[1]})`;

    if (firstPartMatch) {
      phone += `-${firstPartMatch[1]}`;

      if (secondPartMatch) {
        phone += `-${secondPartMatch[1]}`;
      }
    }
  }

  return phone;
}

export function maskZipcode(string) {
  const zipCode = string.replace(/[^0-9]/g, '');

  if (/\d{6}/.test(zipCode)) {
    return zipCode.replace(/^(\d{5})(\d{1,4})\d*$/, '$1-$2');
  }

  return zipCode;
}

export function validateName(string) {
  return /^([a-zA-ZñÑáéíóúÁÉÍÓÚ'-]\s?)+$/.test(string);
}

export function validatePhone(string) {
  if (!string) {
    return false;
  }

  return string.replace(/[()-]/g, '').length === 10;
}

export function validateLinesAddress(string) {
  const hasNumber = /\b\d+\b/.test(string);
  const hasWord = /\b[A-Za-z]+\b/.test(string);

  return hasNumber && hasWord;
}

export function validateCityName(string) {
  return /^[A-Za-z]+(,?\s+[A-Za-z]+|\.?)?$/.test(string.trim());
}

export function validateUserName(string) {
  return /^[A-Za-z\d]+\.?[A-Za-z\d]+$/.test(string);
}

export function validateZipCode(string) {
  return /^\d{5}([- ]\d{4})?$/.test(string);
}

export function bytesToSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) {
    return '0';
  }

  const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i === 0) {
    return `${bytes} ${sizes[i]})`;
  }
  return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
}

export function maskAccountInfo(string, digits) {
  if (string === null || string === '' || digits <= 0) {
    return string;
  }

  const CHARACTER = 'X';
  const value = string.toString().trim();
  const valueLength = value.length;

  if (valueLength > digits) {
    const totalDigits = valueLength - digits;
    const lastDigits = value.slice(-digits);
    const characters = CHARACTER.repeat(totalDigits);

    return `${characters}${lastDigits}`;
  }
  return value;
}

/* eslint-disable no-bitwise */
export function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((dt + Math.random()) * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return uuid;
}

export function isValidSize(bytes) {
  const megaBytes = bytes / 1000000;
  return megaBytes < 15;
}

// This function uses setTimeout but can be combined with await in an async
// function to wait for some time before continuing execution.
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function metersToPreferredUnits({ i18n, meters }) {
  return (meters * i18n.distance.unitFactor).toFixed(2);
}

export async function playSound(sound) {
  const soundAsync = await sound.replayAsync();
  debounce(sound.stopAsync, soundAsync.durationMillis);
}

export function pickDocumentFromFileSystem() {
  return DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    type: 'application/pdf',
  });
}

export function pickPhotoFromLibrary(options) {
  return ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    mediaType: ImagePicker.MediaTypeOptions.Images,
    ...options,
  });
}

export function changeWidthFromImageUrl({ url, width }) {
  return url ? url.replace(/(maxwidth=)[^&]+/, `$1${width}`) : null;
}

export function formatDate({ date, i18n }) {
  const now = new Date();
  const diff = now - date;

  if (diff < ONE_HOUR) {
    const minutesAgo = Math.floor(diff / ONE_MINUTE);

    if (minutesAgo < 1) {
      return i18n.date.lessThanAMinuteAgo;
    }

    if (minutesAgo === 1) {
      return i18n.date.aMinuteAgo;
    }

    return i18n.date.minutesAgo.replace('{}', minutesAgo);
  }

  const day = date.getDate();

  // Is today?
  if (diff < ONE_DAY) {
    const hoursAgo = Math.floor(diff / ONE_HOUR);
    return i18n.date.hoursAgo.replace('{}', hoursAgo);
  }

  const hour24 = date.getHours();
  const hour = hour24 > 12 ? hour24 - 12 : hour24;
  const amPm = hour24 > 11 ? 'PM' : 'AM';
  const minute = date.getMinutes();
  const formattedMinute = minute < 10 ? `0${minute}` : String(minute);
  const time = `${hour}:${formattedMinute} ${amPm}`;

  if (diff < ONE_WEEK) {
    return i18n.date.dayAtTime
      .replace('{day}', i18n.days[date.getDay()])
      .replace('{time}', time);
  }

  const month = i18n.monthsShort[date.getMonth()];
  const year = date.getFullYear();

  // Is this year?
  if (diff < ONE_YEAR) {
    return i18n.date.monthDayAtTime
      .replace('{month}', month)
      .replace('{day}', day)
      .replace('{time}', time);
  }

  return i18n.date.monthYear
    .replace('{month}', month)
    .replace('{year}', year);
}

function storageKey(key) {
  return STORAGE_KEY_NAME + key.split('/').join('_');
}

export async function storeData({ data, key }) {
  try {
    if (!key) {
      throw new Error('Store required key');
    }

    AsyncStorage.setItem(storageKey(key), JSON.stringify(data));
  } catch (_) {
    doNothing();
  }
}

export async function getData({ key }) {
  try {
    const value = await AsyncStorage.getItem(storageKey(key));

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (_) {
    return null;
  }

  return null;
}

export async function getStorageData(key) {
  return getData({ key });
}

function formatHour(hour) {
  if (!hour) {
    return 12;
  }

  let formattedHour = (hour % 12) || 12;
  formattedHour = formattedHour === 0 ? 12 : formattedHour;
  formattedHour = formattedHour < 10 ? `0${formattedHour}` : formattedHour;

  return formattedHour;
}

export function reminderFormatTime({ hour, i18n, minute }) {
  return i18n.reminders.newReminder.timeFormat
    .replace('{hour}', formatHour(hour))
    .replace('{minutes}', minute < 10 ? `0${minute}` : minute)
    .replace('{timeFormat}', hour < 12
      ? i18n.reminders.newReminder.am
      : i18n.reminders.newReminder.pm);
}

export function reminderFormatTimeByDate(date) {
  return new Moment(date).format('LT');
}

export function reminderFormatDate({ date, i18n }) {
  return i18n.chatbot.dateFormat
    .replace('{month}', i18n.chatbot.months[date.getMonth()])
    .replace('{day}', date.getDate())
    .replace('{year}', date.getFullYear());
}

export function notificationBuilder({ notification, profileId }) {
  const INBOX_AND_DOCS = 'InboxDocs.NewDoc';
  const INSURANCE_RENEWAL = 'Insurance.SheduledRenewal';
  const INSURANCE_PAYMENT_DECLINED = 'Insurance.PaymentDeclined';
  const INSURANCE_CLAIM_MEDICAL_RECORDS = 'Claim.RequiredMedicalRecords';
  const INSURANCE_CLAIM_IN_REVIEW = 'Claim.InReview';
  const INSURANCE_CLAIM_CLOSED = 'Claim.Closed';
  const REMINDER = 'Reminder';
  const CONNECT_FOLLOW_FAMILY = 'Connect.FollowFamily';
  const CONNECT_COMMENT = 'Connect.CommentPreview';
  const CONNECT_REPLIED_COMMENT = 'Connect.RepliedComment';
  const CONNET_LIKE_COMMENT = 'Connect.LikedComment';
  const CONNET_LIKE_POST = 'Connect.LikedPost';
  const CONNECT_TAGGET_POST = 'Connect.TaggedPost';
  const CONNECT_PET_TAGGET_POST = 'Connect.PetTaggedPost';
  const CONNECT_TAGGET_COMMENT = 'Connect.TaggedComment';
  const CONNECT_FOLLOW_LIST = 'Connect.FollowList';

  const { data } = notification;
  const actionData = data && data.actionData
    && typeof notification.data.actionData === 'string'
    ? JSON.parse(data.actionData)
    : data.actionData;

  switch (data.section) {
    case CONNECT_COMMENT:
    case CONNECT_REPLIED_COMMENT:
    case CONNET_LIKE_COMMENT:
    case CONNECT_TAGGET_POST:
    case CONNECT_PET_TAGGET_POST:
    case CONNECT_TAGGET_COMMENT:
    case CONNET_LIKE_POST:
      return {
        params: { postId: actionData.PostId },
        screen: 'PostDetail',
      };

    case CONNECT_FOLLOW_FAMILY:
      return {
        params: { profileId: actionData.ProfileId },
        screen: 'ConnectProfile',
      };

    case CONNECT_FOLLOW_LIST:
      return {
        params: {
          profileId,
          requestingProfile: profileId,
          type: 'followers',
        },
        screen: 'FollowersOrFollowing',
      };

    case INBOX_AND_DOCS:
      return {
        params: {},
        screen: 'InboxDocs',
      };

    case INSURANCE_CLAIM_IN_REVIEW:
    case INSURANCE_CLAIM_CLOSED:
      return {
        params: { claimNumber: actionData.Id },
        screen: 'ClaimSummary',
      };

    case INSURANCE_RENEWAL:
      return {
        params: { policyNumber: actionData.Id },
        screen: 'BillingPreferences',
      };

    case INSURANCE_PAYMENT_DECLINED:
      return {
        params: {},
        screen: 'BillingPreferences',
      };

    case INSURANCE_CLAIM_MEDICAL_RECORDS:
      return {
        params: { claimNumber: actionData.Id },
        screen: 'ClaimSummary',
      };

    case REMINDER:
      return {
        screen: 'Reminder',
      };

    default:
      return null;
  }
}

export const NOTIFICATIONS_CHANNEL_ID = 'mainChannelId';

export function hasSoftKeys() {
  const ACTION_BAR_HEIGTHT = 25;
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  return (screen.height - window.height) !== ACTION_BAR_HEIGTHT;
}

export async function isLocationOutOfBoundaries({ latitude, longitude }) {
  if (!latitude || !longitude) {
    return true;
  }

  const lastLocation = await getStorageData('LAST_LOCATION');
  const currentLocation = { latitude, longitude };

  if (!lastLocation) {
    storeData({ data: currentLocation, key: 'LAST_LOCATION' });
    return true;
  }

  const MAX_DISTANCE = 32.1869; // km
  const distance =
    geolib.getDistance(lastLocation, currentLocation) * 0.001;

  if (distance > MAX_DISTANCE) {
    storeData({ data: currentLocation, key: 'LAST_LOCATION' });
    return true;
  }

  return false;
}
