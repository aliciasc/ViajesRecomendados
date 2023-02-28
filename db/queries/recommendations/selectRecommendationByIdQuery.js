const getDB = require('../../getDB');
const { generateError } = require('../../../helpers');


const selectRecommendationByIdQuery = async ( idRecommendation, idUser) => {
    let connection;
    try {
        connection = await getDB();

        const [recommendations] = await connection.query(
            `
                SELECT
                    R. *,
                    AVG (IFNULL (V. value, 0)) AS media,
                    U.name AS user,
                    IFNULL (R.idUser = ?, 0) AS owner
                FROM recommendation R
                INNER JOIN users U ON U.id = R.idUser
                LEFT JOIN vote V ON V.idRecommendation = R.id
                WHERE R.id = ?
                GROUP BY R.id
            `,
            [idUser, idRecommendation] 
        );
        if (recommendations.length < 1) {
            generateError('Recommendation does not exist.',404);
        }
        
        return recommendations;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectRecommendationByIdQuery;
