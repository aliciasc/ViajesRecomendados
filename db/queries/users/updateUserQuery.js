const getDB = require("../../getDB");
const selectUserByIdQuery = require('./selectUserByIdQuery');

const { generateError } = require("../../../helpers");


const updateUserQuery = async (name, email, idUser) => {
    let connection;

    try {
        connection = await getDB();

        //Check if the name is available.
        if (name) {
            const [users] = await connection.query(
                `SELECT id FROM users WHERE name = ?`,
                [name]
            );

            if (users.length > 0) {
                generateError('User name not available.', 403);
            }
        }

        //Check if the email is available.
        if (email) {
            const [users] = await connection.query(
                `SELECT id FROM users WHERE email = ?`,
                [email]
            );

            if (users.length > 0) {
                generateError('Email not available.', 403);
            }
        }

        //Get user data from token.
        const user = await selectUserByIdQuery(idUser);


        //Set the values ​​from database if there is no new values.
        name = name ? name : user.name;
        email = email ? email : user.email;

        
        //Data update.
        await connection.query(
            `UPDATE users SET name = ?, email = ? WHERE id = ?`,
            [name, email, idUser]
        );


    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserQuery;