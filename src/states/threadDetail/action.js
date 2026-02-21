import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; 
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL', // <-- Tambahan dari file pertama
};

// ==============================
// ACTION CREATORS
// ==============================

function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

// Action creator untuk vote thread detail (Tambahan)
function toggleVoteThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

// Action creators untuk vote comment
function upVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.UP_VOTE_COMMENT, payload: { commentId, userId } };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.DOWN_VOTE_COMMENT, payload: { commentId, userId } };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.NEUTRALIZE_VOTE_COMMENT, payload: { commentId, userId } };
}


// ==============================
// THUNKS
// ==============================

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoadingActionCreator());
  };
}

// Thunk untuk vote thread detail (Tambahan)
function asyncToggleVoteThreadDetail(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    
    // Optimistic Update
    dispatch(toggleVoteThreadDetailActionCreator({ userId: authUser.id, voteType }));
    dispatch(showLoadingActionCreator());

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      // Fallback revert bisa ditambahkan di sini jika API gagal
    }
    dispatch(hideLoadingActionCreator());
  };
}

// Thunks untuk vote comment
function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    dispatch(showLoadingActionCreator());
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      // Revert action jika error
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id })); 
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    dispatch(showLoadingActionCreator());
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      // Revert action jika error
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    dispatch(showLoadingActionCreator());
    try {
      await api.neutralizeVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      // Revert action jika error
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    dispatch(hideLoadingActionCreator());
  };
}

// ==============================
// EXPORT ALL
// ==============================
export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};