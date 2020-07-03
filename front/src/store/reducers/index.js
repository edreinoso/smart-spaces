import { combineReducers } from 'redux';
import authReducer from './auth';
import roomReducer from './rooms';
// import uiReducer from './ui';

export default combineReducers({
    auth: authReducer,
    rooms: roomReducer
    // ui: uiReducer
})