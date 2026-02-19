import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncAddComment,
  // Anda perlu menambahkan thunk untuk vote di action.js
  // asyncToggleVoteThreadDetail,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
// <-- PERUBAHAN: CommentList tidak lagi digunakan, diganti CommentItem
import CommentItem from '../components/CommentItem';

function DetailPage() {
  const { id } = useParams(); // Mengambil id dari URL
  const dispatch = useDispatch();

  // Mengambil data dari Redux store
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    // Mengambil detail thread saat komponen dimuat
    dispatch(asyncReceiveThreadDetail(id));

    // Membersihkan detail thread saat komponen di-unmount
    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  // Fungsi untuk menambah komentar
  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  // Logika untuk vote (masih di-comment, bisa diaktifkan nanti)
  // const onVoteThread = (voteType) => { ... };
  // const onVoteComment = (commentId, voteType) => { ... };

  // Tampilkan null/loading state jika data belum siap
  if (!threadDetail) {
    return null;
  }

  // <-- PERUBAHAN: Struktur JSX diubah sesuai versi terbaru
  return (
    <section id="detail-page-content">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        // voteThread={onVoteThread}
      />
      <div className="comments-section card">
        <h3>Beri Komentar</h3>
        <CommentInput addComment={onAddComment} />

        <h3 className="comments-header">
          {threadDetail.comments.length}
          {' '}
          Komentar
        </h3>
        <div className="comment-list">
          {threadDetail.comments.length > 0 ? (
            threadDetail.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUser={authUser}
                // voteComment={onVoteComment}
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