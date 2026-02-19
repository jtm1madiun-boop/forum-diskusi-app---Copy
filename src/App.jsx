import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  // 1. Ambil state authUser dan isPreload
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // 2. Buat fungsi onSignOut untuk dioper ke Navigation
  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  // Selama proses preload, jangan tampilkan apa-apa
  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        {/* 3. Render Header & Navigation HANYA JIKA authUser tidak null */}
        {authUser && (
          <header>
            <Navigation authUser={authUser} signOut={onSignOut} />
          </header>
        )}
        <main>
          <Routes>
            {/* Rute ini ditampilkan jika BELUM LOGIN */}
            {authUser === null ? (
              <>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
              /* Rute ini ditampilkan jika SUDAH LOGIN */
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/threads/:id" element={<DetailPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;