import { setAuthUserActionCreator } from '../authUser/action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    // eslint-disable-next-line no-unused-vars
    } catch (error) { // <-- Nama variabel bisa tetap 'error' atau '_error'
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoadingActionCreator());
    }
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};