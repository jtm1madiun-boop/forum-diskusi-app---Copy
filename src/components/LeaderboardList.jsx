import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard card">
      <h2><i className="fa-solid fa-trophy"></i> Papan Peringkat</h2>
      <div className="leaderboard-list">
        <div className="leaderboard-header">
          <span>Peringkat</span>
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboards.map((leader, index) => (
          <LeaderboardItem key={leader.user.id} rank={index + 1} {...leader} />
        ))}
      </div>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default LeaderboardList;