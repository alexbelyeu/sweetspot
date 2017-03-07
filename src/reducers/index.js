import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import registerReducer from './RegisterReducer';
import spotsReducer from './SpotsReducer';
import mapReducer from './MapReducer';
import routerReducer from './RouterReducer';
import mainReducer from './MainReducer';
import landingReducer from './LandingReducer';

export default combineReducers({
  loginReducer,
  registerReducer,
  spotsReducer,
  mapReducer,
  routerReducer,
  mainReducer,
  landingReducer,
});
