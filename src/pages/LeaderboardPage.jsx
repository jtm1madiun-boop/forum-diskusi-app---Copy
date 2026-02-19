import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section id="leaderboard-page-content">
      <div className="leaderboard card">
        <h2><i className="fa-solid fa-trophy"></i> Papan Peringkat</h2>
        <div className="leaderboard-list">
          <div className="leaderboard-header">
            <span>Pengguna</span>
            <span>Skor</span>
          </div>
          {leaderboards.length > 0 ? (
            leaderboards.map((leaderboard) => (
              <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
            ))
          ) : (
            <div className="empty-state">
              <p>Papan peringkat masih kosong.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;