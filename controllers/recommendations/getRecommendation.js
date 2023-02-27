const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');

const getRecommendation = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;
        const recommendations = await selectRecommendationByIdQuery( idRecommendation, req.user?.id, );
        
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

module.exports = getRecommendation;