const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteRecommendationQuery = async (idRecommendation) => {
    let connection;

    try {
        connection = await getDB();

        //borramos los votos de la recomendación
        await connection.query(
            `
                DELETE FROM vote WHERE idVote = ?
            `,
            [idVote]
        );

        //borramos la recomendación
        await connection.query(
            `
                DELETE FROM recommendation WHERE idRecommendation = ?
            `,
            [idRecommendation]
        );

    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteRecommendationQuery;