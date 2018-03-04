import { UPDATE_REGION, UPDATE_MY_POSITION, TAP_ON_SPOT } from './types';

export const updateRegion = region => ({
  type: UPDATE_REGION,
  payload: region,
});

export const updateMyPosition = position => ({
  type: UPDATE_MY_POSITION,
  payload: position,
});

export const tapOnSpot = spot => ({
  type: TAP_ON_SPOT,
  payload: spot,
});
