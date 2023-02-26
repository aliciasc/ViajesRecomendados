const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
    let connection;


try {
    connection = await getDB();

    //Get the user by email.
    const [users] = await connection.query(
        `SELECT id, password FROM users WHERE email = ?`,
        [email]
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


module.exports = selectUserByEmailQuery;
