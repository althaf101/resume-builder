import { combineReducers } from 'redux';
// import profile from './profile';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
//  profile
  form: formReducer
});