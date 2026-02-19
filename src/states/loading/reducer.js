import { ActionType } from './action';

function loadingReducer(isLoading = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_LOADING:
      return true;
    case ActionType.HIDE_LOADING:
      return false;
    default:
      return isLoading;
  }
}

export default loadingReducer;