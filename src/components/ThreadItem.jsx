import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index'; // Asumsi Anda punya utilitas format waktu

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  authUser,
  upVotesBy,
  downVotesBy,
  totalComments,
  onVote, // Menerima fungsi onVote dari props
}) {
  // Cek apakah user sudah vote
  const isUpVoted = authUser ? upVotesBy.includes(authUser) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser) : false;

  const handleUpVote = (e) => {
    e.stopPropagation(); // Mencegah navigasi saat klik tombol vote
    onVote(id, isUpVoted ? 'neutral-vote' : 'up-vote');
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    onVote(id, isDownVoted ? 'neutral-vote' : 'down-vote');
  };

  return (
    <article className="thread-item card">
      <p className="thread-category">#{category}</p>
      <Link to={`/threads/${id}`}>
        <h2 className="thread-title">{title}</h2>
      </Link>
      <div className="thread-body">{parse(body)}</div>

      <div className="thread-footer">
        <div className="thread-actions">
          {onVote && ( // Tampilkan tombol vote hanya jika ada handler
            <>
              <button
                type="button"
                className={`btn-vote ${isUpVoted ? 'voted' : ''}`}
                onClick={handleUpVote}
              >
                <i className="fa-solid fa-arrow-up" /> {upVotesBy.length}
              </button>
              <button
                type="button"
                className={`btn-vote ${isDownVoted ? 'voted' : ''}`}
                onClick={handleDownVote}
              >
                <i className="fa-solid fa-arrow-down" /> {downVotesBy.length}
              </button>
            </>
          )}
          <span className="comment-count">
            <i className="fa-solid fa-comment" /> {totalComments} Komentar
          </span>
        </div>
        <div className="thread-info">
          <span>Dibuat oleh <b>{user ? user.name : 'Unknown'}</b></span>
          <img src={user ? user.avatar : ''} alt={user ? user.name : 'avatar'} className="avatar-small" />
          <span className="thread-time">{postedAt(createdAt)}</span>
        </div>
      </div>
    </article>
  );
}

// Bentuk dari object 'user'
const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

// PropTypes untuk validasi
ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape), // Bisa null jika user tidak ditemukan
  authUser: PropTypes.string, // Bisa null jika tidak login
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  onVote: PropTypes.func, // Fungsi vote bersifat opsional
};

// Nilai default untuk props yang mungkin tidak ada
ThreadItem.defaultProps = {
  user: null,
  authUser: null,
  onVote: null,
};

export default ThreadItem;