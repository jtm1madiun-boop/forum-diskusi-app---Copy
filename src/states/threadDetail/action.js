import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action'; // <-- PERUBAHAN: Import dari action loading manual
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
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

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

// Thunks untuk vote comment
function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(showLoadingActionCreator());
    try {
      await api.neutralizeVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    // <-- PERUBAHAN: Gunakan action creator loading manual
    dispatch(hideLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};