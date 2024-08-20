import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
      });
      const _data = await response.json();
      // console.log(_data);
      localStorage.setItem('auth', JSON.stringify(_data));
      window.location.href = '/';

      
      setSuccess('Login successful!');
      // Manejar la respuesta exitosa, como redirigir al usuario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <div className='card'>
        <div className="left">
          <h2>Inscríbete<br />-</h2>
          <p>
            Y empieza a publicar tu mundo!
          </p>
          <span>Do Not have any account?</span>
          <Link to='/login'>
            <button className='btn btn-primary'>Login</button>
          </Link>
        </div>
        <form className="right" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder='name'
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            required
            placeholder='email'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            required
            placeholder='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button type='submit' className='btn'>Register</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>   
      </div>
    </div>
  );
}
