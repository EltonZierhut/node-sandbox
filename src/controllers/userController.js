const databaseConfig = require('../config/database');
const mysql = require('mysql2/promise');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.query;

    try {
        const connection = await mysql.createConnection(databaseConfig);
        
        const insertUser = 'INSERT INTO user(name, email, password) VALUES(?, ?, ?)';

        await connection.query(insertUser, [name, email, password]);
        await connection.end();

        console.log('Pessoa inserida com sucesso');
        res.status(201).json({ message: 'Success' });
    } catch (error) {
        res.status(500).send({
            message: 'Error adding user!',
            body: error,
        });
    }
};

exports.getALLUsers = async (req, res) => {
    try {
        const connection = await mysql.createConnection(databaseConfig);
        
        const [rows] = await connection.query('SELECT * FROM user');
        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).send({
            message: 'Error getting users!',
            body: error,
        });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(databaseConfig);
        
        const user = await connection.query('SELECT * FROM user WHERE id = ?', [id]);
        await connection.end();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error getting user!',
            body: error,
        });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.query;

    try {
        const connection = await mysql.createConnection(databaseConfig);
        
        const [rows] = await connection.query('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).send({
            message: 'Error updating user!',
            body: error,
        });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(databaseConfig);
        
        await connection.query('DELETE FROM user WHERE id = ?', [id]);
        await connection.end();

        res.status(200).send({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting user!',
            body: error,
        });
    }
}