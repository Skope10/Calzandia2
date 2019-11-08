import { combineReducers } from 'redux';
import CommonReducer from './common';
import mealsReducer from './mealsReducer';

export default combineReducers({
  common: CommonReducer,
  meals: mealsReducer,
});
