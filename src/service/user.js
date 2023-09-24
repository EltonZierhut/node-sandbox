const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");;

function validateUserData(name, email, password) {
    if (!name) throw new Error('Name is required!');
    if (name.length < 3) throw new Error('Name must be at least 3 characters long!');
    if (!email) throw new Error('Email is required!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Email is invalid!');
      }      
    if (!password) throw new Error('Password is required!');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long!');
}

async function createUser(name, email, password) {
    const connection = await mysql.createConnection(databaseConfig);

    validateUserData(name, email, password);

    const insertUser = 'INSERT INTO user(name, email, password) VALUES(?, ?, ?)';

    await connection.query(insertUser, [name, email, password]);
    await connection.end();
}

async function getALLUsers() {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query('SELECT * FROM user');
    await connection.end();

    return rows;
}

async function getUserById(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query('SELECT * FROM user WHERE id = ?', [id]);
    await connection.end();

    return rows;
}

async function updateUser(id, name, email, password) {
    const connection = await mysql.createConnection(databaseConfig);

    validateUserData(name, email, password);

    const [rows] = await connection.query('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
    await connection.end();

    return rows;
}

async function deleteUser(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query('DELETE FROM user WHERE id = ?', [id]);
    await connection.end();

    return rows;
}

module.exports = {
    createUser,
    getALLUsers,
    getUserById,
    updateUser,
    deleteUser,
}
