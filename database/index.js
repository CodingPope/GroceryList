const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "groceryList",
  password: "password",
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err, err.message);
  } else {
    console.log("You're Connected!");
  }
});
module.exports = dbConnection;
