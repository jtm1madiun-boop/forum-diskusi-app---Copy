import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

// <-- PERUBAHAN: Tambahkan voteType ke dalam parameter dan payload
function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: { threadId, userId, voteType }, 
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncToggleVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    // <-- PERUBAHAN: Kirimkan voteType ke action creator
    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType }));
    dispatch(showLoadingActionCreator());

    try {
      if (voteType === 'up-vote') {
        await api.upVoteThread(threadId);
      } else if (voteType === 'down-vote') {
        await api.downVoteThread(threadId);
      } else if (voteType === 'neutral-vote') {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      // Catatan: Idealnya rollback menggunakan state sebelumnya, 
      // tapi untuk sementara kita netralkan jika gagal agar UI tidak out-of-sync
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType: 'neutral-vote' }));
    }
    
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
};