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
        .catch(() => {
          // On Test
          loadSpotsSuccess(
            dispatch,
            [
              {
                name: 'La Máquina de Chamberí',
                key: 1,
                description: 'There are three distinct environments at La Máquina de Chamberí; the bar, a sit down restaurant, and a private commedor.',
                position: {
                  latitude: 40.4401068,
                  longitude: -3.699423300000035,
                },
                promo: 'Caña más tapa',
                price: 2.5,
                image: 'https://s3-eu-west-1.amazonaws.com/lamaquina-wordpress-dev/wp-content/uploads/2016/06/12121904/salon-830x506.jpg',
                behind_image: 'https://s3-eu-west-1.amazonaws.com/lamaquina-wordpress-dev/wp-content/uploads/2016/06/12121904/salon-830x506.jpg',
              },
              {
                name: 'De Raimundo',
                key: 2,
                description: 'En De Raimundo tienes unas tapas que te mueres por el mejor precio. No te lo pienses, ven!',
                position: {
                  latitude: 40.4458994,
                  longitude: -3.6998595000000023,
                },
                promo: '3 cañas',
                price: 5.5,
                image: 'https://console.listae.com/files/2014/01/restaurante_la_imperial_de_raimundo_barra.jpg',
                behind_image: 'https://console.listae.com/files/2014/01/restaurante_la_imperial_de_raimundo_barra.jpg',
              },
              {
                name: 'Musa Malasaña',
                key: 3,
                description: 'En Musa Malasaña es imposible no pasarlo bien con todo lo que tienes a tu alrededor y camareros tan amables y extrovertidos.',
                position: {
                  latitude: 40.428805,
                  longitude: -3.7043129999999564,
                },
                promo: 'Huevos rotos',
                price: 7.5,
                image: 'https://madridalacarta.com/files/2013/11/saporem_interior02.jpg',
                behind_image: 'https://madridalacarta.com/files/2013/11/saporem_interior02.jpg',
              },
              {
                name: 'Lolina Vintage Café',
                key: 4,
                description: 'Los mejores brunch de todo Malasaña. Ven y prueba nuestros famosos huevos benedictinos. No te arrepentirás.',
                position: {
                  latitude: 40.4196563,
                  longitude: -3.6969741999999997,
                },
                promo: 'Brunch del día',
                price: 10,
                image: 'https://thesixties60s.files.wordpress.com/2012/11/salooon.jpg',
                behind_image: 'https://thesixties60s.files.wordpress.com/2012/11/salooon.jpg',
              },
              {
                name: 'El Mega',
                key: 5,
                description: 'Aquí vienen todos los ratas del barrio a ver si rascan una cerveza por un un euro. Si eres un niño rata, este es tu sitio.',
                position: {
                  latitude: 40.4370199,
                  longitude: -3.7128970999999638,
                },
                promo: '5 vermús',
                price: 12,
                image: 'https://media-cdn.tripadvisor.com/media/photo-s/07/cf/25/e6/miladama.jpg',
                behind_image: 'https://media-cdn.tripadvisor.com/media/photo-s/07/cf/25/e6/miladama.jpg',
              },
            ],
          );
          // On Prod
          // loadSpotsError(dispatch, error.message)
        });
      } catch (e) {
        // TODO handle error
        console.log(`Error: ${e.message}`);
      }
    })();
  };
};
