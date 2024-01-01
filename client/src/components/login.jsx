import React from 'react';
import { useState } from 'react';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
   
    if (!username || !password) {
      alert('Fill in all input fields.');
      return;
    }

    try {
      // Send information to server
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        setLoggedIn(true);
        alert('Login succesful!');
        // Voer hier eventuele navigatie/logica uit na succesvol inloggen
      } else {
        setLoggedIn(false);
        alert('Login error.');
      }
    } catch (error) {
      console.error('An internal error occurred during login:', error);
      alert('An internal error occurred during login:');
    }
  };

  if (!loggedIn) {
    return (
      <div className='container'>
        <h1 className='title'>Login</h1>
          <form className='formFields' onSubmit={handleLogin}>
            <input className="username" type="text" placeholder='username' name="user_name" onChange={(e) => setUsername(e.target.value)} />
            <input className="password" type="password" placeholder='password' name="password" onChange={(e) => setPassword(e.target.value)} />
            <button className='buttonSubmit' type='submit'>Login</button>
          </form>
          <p className='textSwitch'>Don't have an account? <a className='hrefText' href='/register'>Register!</a></p>
      </div>
    )
  } else {
    return (
      <h1>ewa</h1>
    )
  }
  
}

export default Login;