import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput'; // Komponen ini akan kita buat setelah ini

function LoginPage() {
  const dispatch = useDispatch();

  /**
   * Fungsi untuk men-dispatch thunk asyncSetAuthUser.
   * Fungsi ini akan diteruskan sebagai prop ke komponen LoginInput.
   */
  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="auth-page" id="login-page">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fa-solid fa-comments icon-logo" />
          <h2>Selamat Datang Kembali</h2>
          <p>Masuk untuk melanjutkan ke Forum Diskusi</p>
        </div>
        
        {/*
          Form input digantikan oleh komponen LoginInput.
          Kita meneruskan fungsi onLogin sebagai 'prop' bernama 'login'.
        */}
        <LoginInput login={onLogin} />

        <p className="auth-switch">
          Belum punya akun? 
          {' '}
          {/* Tag <a> diganti dengan <Link> dari react-router-dom */}
          <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;