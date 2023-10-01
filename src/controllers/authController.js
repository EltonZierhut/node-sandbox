const jwt = require('jsonwebtoken');
const databaseConfig = require('../config/database');
const mysql = require('mysql2/promise');

async function AuthController(req, res) {
    const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);

    await connection.end();

    if (rows.length === 0) throw new Error('User or password invalid!');

    const id = rows[0].id;

    const token = jwt.sign({ id, email }, 'SECRET', {
        expiresIn: 300,
    })

    res.status(200).send({ auth: true, token: token });
  }catch(error) {
    res.status(500).send({
      message: 'Error auth user!',
      body: error.message,
    });
  }
}

function VerifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
        req.userId = decoded.id;

        next();
    });
}

module.exports = {
    AuthController,
    VerifyJWT,
};