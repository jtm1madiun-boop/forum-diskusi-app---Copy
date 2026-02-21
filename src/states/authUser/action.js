import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';
import { toast } from 'react-toastify'; // <-- PERUBAHAN: Import toast

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return { type: ActionType.SET_AUTH_USER, payload: { authUser } };
}

function unsetAuthUserActionCreator() {
  return { type: ActionType.UNSET_AUTH_USER, payload: { authUser: null } };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      toast.success('Login berhasil!'); // <-- PERUBAHAN: Toast success
    } catch (error) {
      toast.error(error.message); // <-- PERUBAHAN: Ganti alert dengan toast.error
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    toast.info('Anda telah logout.'); // <-- PERUBAHAN: Toast info
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};