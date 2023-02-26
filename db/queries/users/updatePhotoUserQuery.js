const getDB = require("../../getDB");

const updatePhotoUserQuery = async (photo, idUser) => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(`UPDATE users SET photo = ? WHERE id = ?`, [photo, idUser,]);

    } finally {
        if (connection) connection.release();
    }
};


module.exports = updatePhotoUserQuery;