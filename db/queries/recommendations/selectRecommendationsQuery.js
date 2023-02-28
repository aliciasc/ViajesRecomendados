const getDB = require('../../getDB');

const selectRecommendationsQuery = async (idUser, category = '', place = '') => {
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
                WHERE R.category LIKE ? AND R.place LIKE ?
                GROUP BY R.id

            `,
            [idUser, `%${category}%`, `%${place}%`] 
        );
        
        return recommendations;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectRecommendationsQuery;
