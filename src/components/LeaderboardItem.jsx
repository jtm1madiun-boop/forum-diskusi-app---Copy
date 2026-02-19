import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score, rank }) {
  return (
    <div className="leaderboard-item">
      <span className="rank">{rank}</span>
      <div className="leaderboard-user">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <span>{user.name}</span>
      </div>
      <span className="score">{score}</span>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;