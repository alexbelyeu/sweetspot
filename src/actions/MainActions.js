import {
  CHANGE_MAIN_TAB,
} from './types';

export const switchTab = index => ({
  type: CHANGE_MAIN_TAB,
  payload: index,
});
