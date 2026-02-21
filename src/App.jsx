import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // <-- PERUBAHAN: Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // <-- PERUBAHAN: Import CSS Toastify

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
  const theme = useSelector((states) => states.theme); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

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
      
      {/* <-- PERUBAHAN: Letakkan ToastContainer di sini */}
      <ToastContainer position="top-center" autoClose={3000} theme={theme} />
    </>
  );
}

export default App;