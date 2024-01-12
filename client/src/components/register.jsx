import React from 'react';
import { useState } from 'react';

function Register() {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackFields, setFeedbackFields] = useState('');
  const [feedbackPassword, setFeedbackPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      setFeedbackFields('Fill in all input fields.');
      return;
    }

    if (password !== confirmPassword) {
      setFeedbackPassword('Passwords do not match.');
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
        setFeedback('Registration succesful!')

        // fields empty after registration
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setFeedbackError('');

      } else {
        setFeedbackError('Registration failed.');
        setFeedback('');
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
          {feedback && <p className='feedback'>{feedback}</p>}
          {feedbackError && <p className='feedbackError'>{feedbackError}</p>}
          {feedbackFields && <p className='feedbackError'>{feedbackFields}</p>}
          {feedbackPassword && <p className='feedbackError'>{feedbackPassword}</p>}
        </form>
      <p className='textSwitch'>Already have an account? <a className='hrefText' href='/'>Login!</a></p>
    </div>
  )
}

export default Register;