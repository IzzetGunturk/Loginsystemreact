import React from 'react';
import { useState } from 'react';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Voorkom standaard HTML-formuliergedrag
   
    if (!username || !password) {
      alert('Vul alle velden in.');
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
        alert('Inloggen succesvol!');
        // Voer hier eventuele navigatie/logica uit na succesvol inloggen
      } else {
        setLoggedIn(false);
        alert('Inloggen mislukt.');
      }
    } catch (error) {
      console.error('Er is een fout opgetreden bij het inloggen:', error);
      alert('Er is een fout opgetreden bij het inloggen.');
    }
  };

  if (!loggedIn) {
    return (
      <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
              <input className="username" type="text" placeholder='username' name="user_name" onChange={(e) => setUsername(e.target.value)} />
              <input className="password" type="password" placeholder='password' name="password" onChange={(e) => setPassword(e.target.value)} />
              <button type='submit'>Login</button>
          </form>
          <p>Don't have an account? <a href='/register'>Register!</a></p>
      </div>
    )
  } else {
    return (
      <h1>ewa</h1>
    )
  }
  
}

export default Login;