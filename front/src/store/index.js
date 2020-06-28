import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
// import uiReducer from './reducers/ui';

export default combineReducers({
    auth: authReducer,
    // ui: uiReducer
})