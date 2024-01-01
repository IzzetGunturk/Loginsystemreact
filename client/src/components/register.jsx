import React from 'react';
import { useState } from 'react';

function Register() {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      alert('Fill in all input fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      // send information to server 
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        alert('Registration succesful!');

        // fields empty after registration
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

      } else {
        alert('Registration error.');
      }
    } catch (error) {
      console.error('An internal error occurred during registration:', error);
      alert('An internal error occurred during registration.');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Register</h1>
        <form className='formFields' onSubmit={handleRegister}>
          <input className="email" type="text" placeholder='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="username" type="text" placeholder='username' name="user_name" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="password" type="password" placeholder='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="confirmpassword" type="password" placeholder='confirm password' name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className='buttonSubmit' type='submit'>Register</button>
        </form>
      <p className='textSwitch'>Already have an account? <a className='hrefText' href='/'>Login!</a></p>
    </div>
  )
}

export default Register;