const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertVoteQuery = async (idUser, idRecommendation, value) => {
    let connection;

    try {
        connection = await getDB();

        // Comprobamos si ya se ha votado esta entrada.
        const [vote] = await connection.query(
            `SELECT id FROM vote WHERE idUser = ? AND idRecommendation = ?`,
            [idUser, idRecommendation]
        );

        if (vote.length > 0) {
            generateError('The recommendation has already been voted on.', 403);
        }

        await connection.query(
            `INSERT INTO votes (idUser, idRecommendation, value) VALUES (?, ?, ?)`,
            [idUser, idRecommendation, value]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteQuery;

