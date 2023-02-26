const getDB = require('../../getDB');

const selectRecommendationsQuery = async (idUser) => {
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
            `
        );
        
        return recommendations;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectRecommendationsQuery;
