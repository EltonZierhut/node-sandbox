const mysql = require("mysql2/promise");
const database = require("../config/database");

async function createTableUser() {
  try {
    const connection = await mysql.createConnection(database);

    await connection.query(`USE ${database.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS user (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )`);

    await connection.end();

    console.log("Table user created!");
  } catch (error) {
    console.log("Error creating table user: ", error);
  }
}

createTableUser();
