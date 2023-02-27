const getDB = require('../../getDB');

const newCommentQuery = async ( comment, idUser ) => {
    let connection;

    try {
        connection = await getDB();

        const [comment] = await connection.query(
            `INSERT INTO comment (comment, idUser, idRecommendation) VALUES (?, ?, ?)`,
            [ comment, idUser, idRecommendation ]
        );

        return {
            id: comment.insertId,
            comment,
            idUser,
            idRecommendation,
            createdAt: new Date(),
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newCommentQuery;