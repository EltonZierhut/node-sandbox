const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const databaseConfig = require("./config/database");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const cors = require("cors");

const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection(databaseConfig);

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
