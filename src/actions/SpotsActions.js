import {
  LOAD_SPOTS_SUCCESS,
  LOAD_SPOTS_ERROR,
  LOAD_SPOTS,
} from './types';
import BASE_URL from '../ENV';

const loadSpotsSuccess = (dispatch, response) => {
  dispatch({
    type: LOAD_SPOTS_SUCCESS,
    payload: response,
  });
};

const loadSpotsError = (dispatch, error) => {
  dispatch({
    type: LOAD_SPOTS_ERROR,
    payload: error,
  });
};

export const loadSpots = (token) => {
  return (dispatch) => {
    dispatch({ type: LOAD_SPOTS });

    (async () => {
      try {
        const request = new Request(`${BASE_URL}/spots/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        });
        fetch(request)
        .then(response => response.json())
        .then((response) => {
          if (response.detail) {
            loadSpotsError(dispatch, response.detail);
          } else {
            response.forEach((spot) => {
              spot.latlng = {
                latitude: parseFloat(spot.position.split(',')[0], 10),
                longitude: parseFloat(spot.position.split(',')[1], 10) };
            });
            loadSpotsSuccess(dispatch, response);
          }
        })
        .catch(error => loadSpotsError(dispatch, error.message));
      } catch (e) {
        // TODO handle error
        console.log(`Error: ${e.message}`);
      }
    })();
  };
};
