import React from 'react';
import { useState } from 'react';

function Register() {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackFields, setFeedbackFields] = useState('');
  const [feedbackPassword, setFeedbackPassword] = useState('');

  const length = password.length >= 8;
  const uppercase = /[A-Z]/.test(password); // const uppercase = /[A-Z]/.test('somepassword'); -> parameter will check the filled password
  const lowercase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const special = /[@$!%*?&]/.test(password);

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

    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== passwordRule.test()) {
      setFeedbackPassword('Password is to easy.');
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
        setFeedbackPassword('');
        setConfirmPassword('');
        setFeedbackError('');
        setShowPassword(false);
        setShowConfirmPassword(false);

      } else {

        const errorText = await response.text();
        if (errorText === '"Email already exists."') {
          setFeedbackError('Email already exists')
        }
        else if (errorText === '"Username already exists."') {
          setFeedbackError('Username already exists')
        }
        else if (errorText === '"Email and username already exists."') {
          setFeedbackError('Email and username already exists')
        }
        setFeedback('');
      }
    } catch (error) {
      console.error('An internal error occurred during registration:', error);
      alert('An internal error occurred during registration.');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleShowNotPopup = () => {
    setShowPopup(false);
  };


  return (
    <div className='container'>
      <h1 className='title'>Register</h1>
        <form className='formFields' onSubmit={handleRegister}>
          <input className="email" type="text" placeholder='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="username" type="text" placeholder='username' name="user_name" value={username} onChange={(e) => setUsername(e.target.value)} />
          
          <div className='showPassword'>
            <input className="password" type={showPassword ? "text" : "password"} placeholder='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {showPassword ? 
            <svg className="iconShowPassword" onClick={handleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            : 
            <svg className="iconShowPassword" onClick={handleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            }
            <svg className="iconInformation" onMouseEnter={handleShowPopup} onMouseLeave={handleShowNotPopup} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            {showPopup && 
            <div className='popupPasswordRules'>
              <p>{length ? '✔️' : '❌'} Minimal 8 characters long</p>
              <p>{uppercase ? '✔️' : '❌'} Contain at least one uppercase letter</p>
              <p>{lowercase ? '✔️' : '❌'} One lowercase letter</p>
              <p>{number ? '✔️' : '❌'} One number</p>
              <p>{special ? '✔️' : '❌'} One special character</p>
            </div>
            }
          </div>
          
          <div className='showPassword'>
            <input className="confirmpassword" type={showConfirmPassword ? "text" : "password"} placeholder='confirm password' name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {showConfirmPassword ? 
              <svg className="iconConfirmShowPassword" onClick={handleShowConfirmPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              : 
              <svg className="iconConfirmShowPassword" onClick={handleShowConfirmPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              }
          </div>
          
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