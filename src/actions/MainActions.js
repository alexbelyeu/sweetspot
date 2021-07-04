import { CHANGE_MAIN_TAB } from './types';

export const switchMainTab = index => ({
  type: CHANGE_MAIN_TAB,
  payload: index,
});
