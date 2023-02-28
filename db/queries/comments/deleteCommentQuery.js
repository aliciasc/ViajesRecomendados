const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteCommentQuery = async (idRecommendation, idUser) => {
    let connection;

    try {
        connection = await getDB();

        //Check that the user voted.
        const [comment] = await connection.query(
            `SELECT id FROM comment WHERE idRecommendation = ? AND idUser = ?`,
            [idRecommendation, idUser]
        );

        //Throw an error if the user did not vote.
        if (comment.length < 1) {
            generateError('Comment not found', 404);
        }

        await connection.query(
            `DELETE FROM comment WHERE idRecommendation = ? AND idUser = ?`,
            [idRecommendation, idUser]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteCommentQuery;

