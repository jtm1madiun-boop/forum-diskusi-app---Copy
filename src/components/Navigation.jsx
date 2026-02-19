import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { asyncSetTheme } from '../states/theme/action';

function Navigation({ authUser, signOut }) {
  const theme = useSelector((states) => states.theme);
  const dispatch = useDispatch();

  const onThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(asyncSetTheme(newTheme));
  };

  return (
    <nav>
      <div className="nav-brand">
        <i className="fa-solid fa-comments"></i>
        <h1><Link to="/">Forum Diskusi</Link></h1>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/">Threads</NavLink></li>
        <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
      </ul>
      <div className="nav-user">
        <button type="button" onClick={onThemeToggle} className="btn-theme-toggle">
          {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
        </button>
        <img src={authUser.avatar} alt={authUser.name} className="avatar" />
        <span>{authUser.name}</span>
        <button type="button" onClick={signOut} className="btn-logout" title="Logout">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
}

// <-- PERUBAHAN: Mendefinisikan bentuk (shape) dari authUser untuk PropTypes yang lebih spesifik
const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  // <-- PERUBAHAN: Menggunakan shape yang telah didefinisikan
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;