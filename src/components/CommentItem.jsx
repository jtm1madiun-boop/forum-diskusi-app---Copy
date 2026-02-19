import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { postedAt } from '../utils';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, voteComment }) {
  const authUser = useSelector((states) => states.authUser);

  // Cek apakah pengguna saat ini sudah up-vote atau down-vote
  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    // Memanggil fungsi voteComment saat tombol up-vote diklik
    voteComment(id, isUpVoted ? 0 : 1); // Kirim 0 untuk netral, 1 untuk up-vote
  };

  const onDownVoteClick = () => {
    // Memanggil fungsi voteComment saat tombol down-vote diklik
    voteComment(id, isDownVoted ? 0 : -1); // Kirim 0 untuk netral, -1 untuk down-vote
  };

  return (
    <article className="comment-item">
      <div className="comment-main">
        <img src={owner.avatar} alt={owner.name} className="avatar" />
        <div className="comment-content">
          <p className="comment-author">
            <b>{owner.name}</b> • <span className="thread-time">{postedAt(createdAt)}</span>
          </p>
          <div>{parse(content)}</div>
        </div>
      </div>
      <div className="thread-actions">
        <button type="button" onClick={onUpVoteClick} className={isUpVoted ? 'btn-vote voted' : 'btn-vote'}>
          <i className="fa-solid fa-arrow-up"></i> {upVotesBy.length}
        </button>
        <button type="button" onClick={onDownVoteClick} className={isDownVoted ? 'btn-vote voted' : 'btn-vote'}>
          <i className="fa-solid fa-arrow-down"></i> {downVotesBy.length}
        </button>
      </div>
    </article>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  voteComment: PropTypes.func.isRequired, // Props ini sekarang divalidasi
};

export default CommentItem;