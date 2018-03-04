import { CHANGE_LANDING_TAB } from './types';

export const switchLandingTab = index => ({
  type: CHANGE_LANDING_TAB,
  payload: index,
});
