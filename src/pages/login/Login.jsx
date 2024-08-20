import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const _data = await response.json();
      localStorage.setItem('auth', JSON.stringify(_data));
      window.location.href = '/';

      
      setSuccess('Login successful!');
      // Manejar la respuesta exitosa, como redirigir al usuario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>
            -<br /> Inicia Sesión
            <br />-
          </h2>
          <p>Publica tu mundo!</p>
          <span>No tienes cuenta aún?</span>
          <Link to="/signup">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
        <form className="right" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="btn">
            Login
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
}
