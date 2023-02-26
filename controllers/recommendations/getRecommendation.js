const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');

const getRecommendation = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;
        const recommendations = await selectRecommendationByIdQuery(idRecommendation, req.user?.id);
        
        res.send({
            status: 'ok',
            data: {
                recommendation,
            }
        });

    } catch (error) {
        next(error);
        
    }
};

module.exports = getRecommendation;