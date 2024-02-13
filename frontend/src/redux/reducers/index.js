import { combineReducers } from 'redux';
import variableReducer from './variableReducer';

const rootReducer = combineReducers({
  variables: variableReducer,
});

export default rootReducer;
