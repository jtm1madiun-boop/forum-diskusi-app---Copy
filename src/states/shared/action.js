import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; // <-- PERUBAHAN: Import dari action loading manual
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      // Mengambil data users dan threads secara paralel
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

export { asyncPopulateUsersAndThreads };