import React from 'react';
import { useState } from 'react';

function Register() {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Voorkom standaard HTML-formuliergedrag

    if (!email || !username || !password || !confirmPassword) {
      alert('Vul alle velden in.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Wachtwoorden komen niet overeen.');
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
        alert('Registratie succesvol!');
      } else {
        alert('Registratie mislukt.');
      }
    } catch (error) {
      console.error('Er is een fout opgetreden bij de registratie:', error);
      alert('Er is een fout opgetreden bij de registratie.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input className="email" type="text" placeholder='email' name="email" onChange={(e) => setEmail(e.target.value)} />
          <input className="username" type="text" placeholder='username' name="user_name" onChange={(e) => setUsername(e.target.value)} />
			    <input className="password" type="password" placeholder='password' name="password" onChange={(e) => setPassword(e.target.value)} />
			    <input className="confirmpassword" type="password" placeholder='confirm password' name="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <a href='/'>Login!</a></p>
    </div>
  )
}

export default Register;