import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; // <-- PERUBAHAN: Import dari action loading manual
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      await api.register({ name, email, password });
      // opsional: bisa ditambahkan navigasi ke halaman login setelah sukses
    } catch (error) {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};