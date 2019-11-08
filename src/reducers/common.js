import {
  ALERT_CLOSED,
  ALERT_OPENED,
  CAMERA_RESET,
  CAMERA_SHOWN,
  CONNECT_INITIAL_ROUTE_CHANGED,
  FAILED_TO_LOAD_NOTIFICATION_IMAGE,
  GOT_LOCATION,
  INTERNAL_NOTIFICATION_LOADED,
  INTERNAL_NOTIFICATION_VISIBLE_CHANGED,
  LEVEL_UP_MODAL_VISIBLE_CHANGED,
  LOADING_WHEEL_FAIL,
  LOADING_WHEEL_HIDDEN,
  LOADING_WHEEL_RESET,
  LOADING_WHEEL_SHOWN,
  LOADING_WHEEL_SUCCESS,
  LOCALE_LOADED,
  LOGGED_OUT,
  NOTIFICATION_IMAGE_LOADED,
  REQUESTING_LOCATION,
  ON_TAP_SET_WAITING_TIME,
} from '../actions/types';

const INITIAL_STATE = {
  alert: {
    body: null,
    primaryAction: null,
    primaryText: null,
    secondaryAction: null,
    secondaryText: null,
    subText: null,
    title: null,
    visible: false,
  },
  camera: {
    includeBase64: false,
    onPhotoCaptured: null,
    visible: false,
  },
  canTapOnFileRow: true,
  connectInitialRoute: null,
  i18n: null,
  internalNotificationVisible: false,
  levelUpVisible: false,
  loadingWheelSuccess: null,
  loadingWheelText: '',
  loadingWheelVisible: false,
  location: null,
  locationFromZipCode: false,
  notification: null,
  photoGalleryCurrentPost: null,
  requestingLocation: false,
  waitingTime: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALERT_CLOSED:
      return {
        ...state,
        alert: {
          ...INITIAL_STATE.alert,
          visible: false,
        },
      };

    case ALERT_OPENED:
      return {
        ...state,
        alert: {
          body: action.body,
          primaryAction: action.primaryAction,
          primaryText: action.primaryText,
          secondaryAction: action.secondaryAction,
          secondaryText: action.secondaryText,
          subText: action.subText,
          title: action.title,
          visible: true,
        },
      };

    case CAMERA_RESET:
      return { ...state, camera: { ...INITIAL_STATE.camera } };

    case CAMERA_SHOWN:
      return {
        ...state,
        camera: {
          includeBase64: action.includeBase64,
          onPhotoCaptured: action.onPhotoCaptured,
          visible: true,
        },
      };

    case GOT_LOCATION:
      return {
        ...state,
        location: action.location,
        locationFromZipCode: action.locationFromZipCode,
        requestingLocation: false,
      };

    case LOADING_WHEEL_FAIL:
      return { ...state, loadingWheelSuccess: false };

    case LOADING_WHEEL_HIDDEN:
      return { ...state, loadingWheelVisible: false };

    case LOADING_WHEEL_RESET:
      return {
        ...state,
        loadingWheelSuccess: null,
        loadingWheelVisible: false,
      };

    case LOADING_WHEEL_SHOWN:
      return {
        ...state,
        loadingWheelText: action.text,
        loadingWheelVisible: true,
      };

    case LOADING_WHEEL_SUCCESS:
      return { ...state, loadingWheelSuccess: true };

    case LOCALE_LOADED:
      return { ...state, i18n: action.i18n };

    case LOGGED_OUT:
      return { ...INITIAL_STATE, i18n: state.i18n };

    case REQUESTING_LOCATION:
      return { ...state, requestingLocation: true };

    case CONNECT_INITIAL_ROUTE_CHANGED:
      return { ...state, connectInitialRoute: action.newRoute };

    case ON_TAP_SET_WAITING_TIME:
      return { ...state, waitingTime: action.waitingTime };

    case LEVEL_UP_MODAL_VISIBLE_CHANGED:
      return { ...state, levelUpVisible: action.visible };

    case INTERNAL_NOTIFICATION_VISIBLE_CHANGED:
      return { ...state, internalNotificationVisible: action.visible };

    case INTERNAL_NOTIFICATION_LOADED:
      return {
        ...state,
        internalNotificationVisible: true,
        notification: action.notification,
      };

    case FAILED_TO_LOAD_NOTIFICATION_IMAGE:
      return { ...state };

    case NOTIFICATION_IMAGE_LOADED:
      return {
        ...state,
        notification: {
          ...state.notification,
          image: action.image,
        },
      };

    default:
      return state;
  }
}
