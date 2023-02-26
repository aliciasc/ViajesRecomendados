const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

try {
    connection = await getDB();

    //Get the user by id.
    const [users] = await connection.query(
        `SELECT id, name, email, biography, photo FROM users WHERE id = ?`,
        [idUser]
    );

    // Throw an error if there is no user.
    if (users.length < 1) {
        generateError('User not found.', 404);
    }

    return users [0];

} finally {
    if (connection) connection.release()
}
};


module.exports = selectUserByIdQuery;
