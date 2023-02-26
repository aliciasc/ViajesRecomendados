const selectRecommendationsQuery = require('../../db/queries/recommendations/selectRecommendationsQuery');

const listRecommendations = async (req, res, next) => {
    try {
        const recommendations = await selectRecommendationsQuery(req.user?.id);
        
        res.send({
            status: 'ok',
            data: {
                recommendations,
            }
        });

    } catch (error) {
        next(error);
        
    }
};

module.exports = listRecommendations;