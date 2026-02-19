import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: { authUser: null },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoadingActionCreator());
  };
}

// Thunk untuk proses logout pengguna
function asyncUnsetAuthUser() {
  return (dispatch) => {
    // 1. Dispatch action untuk mengosongkan authUser di state Redux
    dispatch(unsetAuthUserActionCreator());
    // 2. Hapus access token dari local storage
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser, // Menambahkan fungsi baru ke export
};