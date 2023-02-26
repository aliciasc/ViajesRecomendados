const getDB = require('../../getDB');

const newRecommendationQuery = async ( tittle, category, place, summary, text ,photo, idUser ) => {
    let connection;

    try {
        connection = await getDB();

        const [recommendation] = await connection.query(
            `INSERT INTO recommendation ( tittle, category, place, summary, text ,photo, idUser) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ tittle, category, place, summary, text ,photo, idUser ]
        );

        return {
            id: recommendation.insertId,
            tittle, category, place, summary, text ,photo,
            idUser,
            createdAt: new Date(),
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newRecommendationQuery;