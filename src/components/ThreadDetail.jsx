import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { postedAt } from '../utils';
import parse from 'html-react-parser';

function ThreadDetail({ id, title, body, category, createdAt, owner, upVotesBy, downVotesBy, voteThread }) {
  const authUser = useSelector((states) => states.authUser);

  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    voteThread(id, 1); // <-- 'id' dan 'voteThread' sekarang digunakan
  };

  const onDownVoteClick = () => {
    voteThread(id, -1); // <-- 'id' dan 'voteThread' sekarang digunakan
  };

  const onNeutralizeVoteClick = () => {
    voteThread(id, 0); // <-- 'id' dan 'voteThread' sekarang digunakan
  }


  return (
    <article className="thread-detail card">
      <p className="thread-category">#{category}</p>
      <h1 className="thread-title">{title}</h1>
      <div className="thread-info-detail">
        <img src={owner.avatar} alt={owner.name} className="avatar" />
        <div>
          <p><b>{owner.name}</b></p>
          <small>Dibuat pada {postedAt(createdAt)}</small>
        </div>
      </div>
      <div className="thread-body-full">{parse(body)}</div>
      <div className="thread-footer">
        <div className="thread-actions">
          <button type="button" onClick={isUpVoted ? onNeutralizeVoteClick : onUpVoteClick} className={isUpVoted ? 'btn-vote voted' : 'btn-vote'}>
            <i className="fa-solid fa-arrow-up"></i> {upVotesBy.length}
          </button>
          <button type="button" onClick={isDownVoted ? onNeutralizeVoteClick : onDownVoteClick} className={isDownVoted ? 'btn-vote voted' : 'btn-vote'}>
            <i className="fa-solid fa-arrow-down"></i> {downVotesBy.length}
          </button>
        </div>
      </div>
    </article>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  voteThread: PropTypes.func.isRequired, // <-- 'voteThread' ditambahkan ke prop validation
};

export default ThreadDetail;