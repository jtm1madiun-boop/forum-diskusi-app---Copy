import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  // 1. State untuk setiap input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 4. Handler yang akan dipanggil saat form disubmit
  const onLoginHandler = (event) => {
    // Mencegah browser me-reload halaman
    event.preventDefault();
    
    // Memanggil fungsi login dari props dengan data dari state
    login({ email, password });
  };

  // 2. Render JSX sesuai mockup HTML
  return (
    <form onSubmit={onLoginHandler} className="auth-form">
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="contoh@email.com"
          value={email} // 3. Nilai input dikontrol oleh state 'email'
          onChange={(e) => setEmail(e.target.value)} // 3. Setiap ketikan akan update state 'email'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Masukkan password"
          value={password} // 3. Nilai input dikontrol oleh state 'password'
          onChange={(e) => setPassword(e.target.value)} // 3. Setiap ketikan akan update state 'password'
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

// 5. Validasi tipe props untuk mencegah bug
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;