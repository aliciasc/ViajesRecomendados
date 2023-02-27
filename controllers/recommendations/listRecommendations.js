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

    } catch (err) {
        next(err);
        
    }
};

module.exports = listRecommendations;