const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertVoteQuery = async (idUser, idRecommendation, value) => {
    let connection;

    try {
        connection = await getDB();

        //Check if the recommendation is voted.
        const [vote] = await connection.query(
            `SELECT id FROM vote WHERE idUser = ? AND idRecommendation = ?`,
            [idUser, idRecommendation]
        );

        if (vote.length > 0) {
            generateError('The recommendation has already been voted on.', 403);
        }

        await connection.query(
            `INSERT INTO vote (idUser, idRecommendation, value) VALUES (?, ?, ?)`,
            [idUser, idRecommendation, value]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteQuery;

