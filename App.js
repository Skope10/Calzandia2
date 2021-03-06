import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import AppRouter from './src/AppRouter';

import { Image, Platform, StyleSheet, View, Text } from 'react-native';

// This disables the ViewPagerAndroid warning
// Remove this when react navigation is updated to >= 3.x.x
YellowBox.ignoreWarnings([
  'Warning: ViewPagerAndroid has been extracted',
]);

const middlewares = [ReduxThunk];

export default () => (
  <Provider store={createStore(reducers, {}, applyMiddleware(...middlewares))}>    
    <View style={{ backgroundColor: '#FFFBFA', flex: 1 }}>
      <AppRouter/>
    </View>
  </Provider>
)
