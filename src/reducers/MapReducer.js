import { Dimensions } from 'react-native';
import { REHYDRATE } from 'redux-persist/constants';
import {
  UPDATE_MY_POSITION,
  UPDATE_REGION,
  TAP_ON_SPOT,
} from '../actions/types';

// candidate to be set in the global application state
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.3718;
const LONGITUDE = -3.1216;
const LATITUDE_DELTA = 9.22; // TODO Set depending on bars around
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_STATE = {
  region: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  myLocation: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  tappedSpot: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_MY_POSITION:
      return { ...state, myLocation: action.payload };

    case UPDATE_REGION:
      return { ...state,
        region: {  // TODO vaya ñapa
          ...state.region,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case TAP_ON_SPOT:
      return { ...state, tappedSpot: action.payload };

    case REHYDRATE: {
      const incoming = action.payload.mapReducer;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }

    default:
      return state;
  }
};
