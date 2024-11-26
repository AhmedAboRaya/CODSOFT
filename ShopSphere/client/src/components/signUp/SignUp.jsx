import { useState } from 'react';
import axios from 'axios';
// import { host } from '../../host.js';; 
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Alert, AlertDescription } from "../ui/alert"
import {Link} from 'react-router-dom'

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
      const response = await axios.post(`http://localhost:5000/api/auth/signup`, {
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
    <div className="container m-auto max-w-md py-12 h-screen px-5 md:pt-20 xl:pt-40 ">
      {/* <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-lg md:w-96">
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
      </form> */}

      <Card className=''>
      <form onSubmit={handleSubmit} className='px-5 py-6'>
        <CardContent className="space-y-4 text-left">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button type="submit" className="w-full">Sign Up</Button>
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
};

export default SignUp;
