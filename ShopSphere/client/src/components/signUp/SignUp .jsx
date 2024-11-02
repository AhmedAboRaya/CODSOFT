import { useState } from 'react';
import axios from 'axios';
import { host } from '../../host'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${host}/auth/signup`, {
        name,
        email,
        password,
      });

      console.log('Sign up successful:', response.data);
      setSuccess('Sign up successful! You can now log in.');
      localStorage.setItem('token', response.data.token); 
      navigate('/')
    } catch (err) {
      console.error('Sign up failed:', err.response.data.msg);
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-lg md:w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text" 
            className="grow"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
