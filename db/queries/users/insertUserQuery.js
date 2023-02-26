const getDB = require('../../getDB');
const  { generateError }  = require('../../../helpers');
const bcrypt = require('bcrypt');

// Query to create a new user.
const insertUserQuery = async (name, email, password, photo, biography) => {
let connection;

try {
  // Try to get a free connection. 
  connection = await getDB(); 

  //Intentamos obtener un usuario con el email dado.
  const [users] = await connection.query(
    `SELECT id FROM users WHERE email = ?`,
    [email]
  ); 

  //Throw an error if there is an user with that email.
  if (users.length > 0) {
    generateError('There is an user with the same email.', 403);
  }

  //Encriptamos contraseña de usuario.
  const hashedPassword = await bcrypt.hash(password, 10);

  //Insertamos el usuario en la base de datos.
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