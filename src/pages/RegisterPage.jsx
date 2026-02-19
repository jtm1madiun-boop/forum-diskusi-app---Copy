import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    // Arahkan ke halaman login setelah dispatch
    navigate('/');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fa-solid fa-comments icon-logo" />
          <h2>Buat Akun Baru</h2>
          <p>Bergabunglah dalam diskusi kami!</p>
        </div>
        <RegisterInput register={onRegister} />
        <p className="auth-switch">
          Sudah punya akun?
          {' '}
          <Link to="/">Login di sini</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;