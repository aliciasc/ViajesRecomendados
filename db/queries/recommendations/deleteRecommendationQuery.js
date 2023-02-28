const getDB = require('../../getDB');

const deleteRecommendationQuery = async (idRecommendation) => {

let connection;
try {
    connection = await getDB();

    //Delete the votes of the recommendation.
    await connection.query(
        `DELETE FROM vote WHERE idRecommendation = ?`,
        [idRecommendation]
        );

    //Delete the comments of the recommendation.
    await connection.query(
        `DELETE FROM comment WHERE idRecommendation = ?`,
        [idRecommendation]
        );    


        //Delete the recommendation after delete the votes.
        await connection.query(
            `DELETE FROM recommendation WHERE id = ?`,
            [idRecommendation]
            );

        } finally {
            if (connection) connection.release();
        }
    };

module.exports = deleteRecommendationQuery;