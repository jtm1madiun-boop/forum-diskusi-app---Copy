import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; // <-- PERUBAHAN: Import dari action loading manual
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error)      {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};