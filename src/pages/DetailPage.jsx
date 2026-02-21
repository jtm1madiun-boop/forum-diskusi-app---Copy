import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncAddComment,
  asyncToggleVoteThreadDetail, // <-- PERUBAHAN: Di-import (akan kita buat di langkah ke-4)
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  // <-- PERUBAHAN: Aktifkan logika vote Thread (parameter dari komponen ThreadDetail: 1, 0, -1)
  const onVoteThread = (threadId, voteType) => {
    dispatch(asyncToggleVoteThreadDetail(threadId, voteType));
  };

  // <-- PERUBAHAN: Aktifkan logika vote Komentar
  const onVoteComment = (commentId, voteType) => {
    if (voteType === 1) {
      dispatch(asyncUpVoteComment(commentId));
    } else if (voteType === -1) {
      dispatch(asyncDownVoteComment(commentId));
    } else {
      dispatch(asyncNeutralizeVoteComment(commentId));
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section id="detail-page-content">
      {/* <-- PERUBAHAN: Aktifkan voteThread */}
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        voteThread={onVoteThread} 
      />
      
      <div className="comments-section card">
        <h3>Beri Komentar</h3>
        <CommentInput addComment={onAddComment} />

        <h3 className="comments-header">
          {threadDetail.comments.length} Komentar
        </h3>
        <div className="comment-list">
          {threadDetail.comments.length > 0 ? (
            threadDetail.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUser={authUser}
                voteComment={onVoteComment} // <-- PERUBAHAN: Aktifkan voteComment
              />
            ))
          ) : (
            <div className="empty-state">
              <p>Jadilah yang pertama berkomentar di diskusi ini!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;