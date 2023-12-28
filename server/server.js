const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Body-parser middleware

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: 'loginreact',
  charset: 'utf8mb4'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected!');
});

app.get('/', (req, res) => {
  return res.json("From backend side");
});

app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json('Vul alle velden in.');
    }

    // the password will be hashed 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user in the database
    db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);
    res.status(200).json('Registratie succesvol');
  } catch (error) {
    console.error('Fout bij registratie:', error);
    res.status(500).json('Er is een interne fout opgetreden bij de registratie.');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // fetch the user from the database based on the provided username
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user from database.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // compare the provided password with the password from the database
    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.json({ message: 'Login successful!'});
    } else {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
  });
});

app.listen(8081, () => {
  console.log("listening");
});
