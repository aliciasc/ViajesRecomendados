const getDB = require('../../getDB');
const { generaterError } = require('../../../helpers');


const selectRecommendationByIdQuery = async (idRecommendation, idUser) => {
    let connection;
    try {
        connection = await getDB();

        const [recommendations] = await connection.query(
            `
                SELECT
                    R. *,
                    U.name AS user,
                    IFNULL (R.idUser = ?, 0) AS owner,
                FROM recommendations R
                INNER JOIN users U ON U.id = R.idUser
                WHERE R.id = ?
            `
           [idUser, idRecommendation] 
        );
        if (recommendations.length < 1) {
            generaterError('La recomendación no existe',404);
        }
        
        return recommendations;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectRecommendationByIdQuery;
