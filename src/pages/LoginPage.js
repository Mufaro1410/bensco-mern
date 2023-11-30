// import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setUser({username: username, password: password})
    navigate('/fleet');
  };

  return (
    <section className='section'>
      <form className='form' onSubmit={handleSubmit}>
        <h5>login</h5>
        <div className='form-row'>
          <label htmlFor='username' className='form-label'>
            username
          </label>
          <input
            type='text'
            className='form-input'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            password
          </label>
          <input
            type='password'
            className='form-input'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block'>
          login
        </button>
      </form>
    </section>
  );
};
export default Login;
