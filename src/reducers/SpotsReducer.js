import { REHYDRATE } from 'redux-persist/constants';
import {
  LOAD_SPOTS_SUCCESS,
  LOAD_SPOTS_ERROR,
  LOAD_SPOTS,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  dataLoaded: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SPOTS_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        dataLoaded: true,
        error: '',
      };
    case LOAD_SPOTS_ERROR:
      return { ...state, items: [], dataLoaded: false, error: action.payload };
    case LOAD_SPOTS:
      return { ...state, items: [], dataLoaded: false, error: '' };
    case REHYDRATE: {
      const incoming = action.payload.spots;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }
    default:
      return state;
  }
};
