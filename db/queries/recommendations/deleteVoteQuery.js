const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertVoteQuery = async (idRecommendation, idUser) => {
    let connection;

    try {
        connection = await getDB();

        //Check that the user voted.
        const [vote] = await connection.query(
            `SELECT id FROM vote WHERE idRecommendation = ? AND idUser = ?`,
            [idRecommendation, idUser]
        );

        //Throw an error if the user did not vote.
        if (vote.length < 1) {
            generateError('Vote not found', 404);
        }

        await connection.query(
            `DELETE FROM vote WHERE idRecommendation = ? AND idUser = ?`,
            [idRecommendation, idUser]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteQuery;

