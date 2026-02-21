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
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  
  // <-- PERUBAHAN 1: Ambil state theme dari Redux
  const theme = useSelector((states) => states.theme); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // <-- PERUBAHAN 2: Tambahkan useEffect untuk memantau perubahan theme
  useEffect(() => {
    // Jika theme adalah 'dark', tambahkan class 'dark-mode' ke body
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      // Jika tidak, hapus class 'dark-mode' dari body
      document.body.classList.remove('dark-mode');
    }
  }, [theme]); // Efek ini akan dijalankan ulang setiap kali 'theme' berubah

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        {authUser && (
          <header>
            <Navigation authUser={authUser} signOut={onSignOut} />
          </header>
        )}
       
        <main>
          <Routes>
            {authUser === null ? (
              <>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
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