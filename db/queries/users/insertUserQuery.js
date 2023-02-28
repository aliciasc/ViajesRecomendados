const getDB = require('../../getDB');
const  { generateError }  = require('../../../helpers');
const bcrypt = require('bcrypt');

// Query to create a new user.
const insertUserQuery = async (name, email, password, photo, biography) => {
let connection;

try {
  // Try to get a free connection. 
  connection = await getDB(); 

  //Get a user with the email.
  const [users] = await connection.query(
    `SELECT id FROM users WHERE email = ?`,
    [email]
  ); 

  //Throw an error if there is an user with that email.
  if (users.length > 0) {
    generateError('There is an user with the same email.', 403);
  }

  //Encrypt user password.
  const hashedPassword = await bcrypt.hash(password, 10);

  //Insert the user in the database.
  await connection.query(
    `INSERT INTO users (name, email, password, photo, biography) VALUE(?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, photo, biography]
  );

} finally {
    // Release the connection if there is.
    if (connection) connection.release();
}
}

module.exports = insertUserQuery;