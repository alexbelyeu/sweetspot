import {
  CHANGE_MAIN_TAB,
} from './types';

const switchTab = index => ({
  type: CHANGE_MAIN_TAB,
  payload: index,
});

export default switchTab;
