import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; // <-- PERUBAHAN: Import dari action loading manual
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

function asyncToggleVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    // Optimistic update: Langsung ubah UI sebelum API call selesai
    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id }));
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());

    try {
      await api.voteThread(threadId, voteType);
    } catch (error) {
      alert(error.message);
      // Rollback: Kembalikan state jika API call gagal
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator, // Ditambahkan kembali untuk kelengkapan
  asyncAddThread,
  asyncToggleVoteThread,
};