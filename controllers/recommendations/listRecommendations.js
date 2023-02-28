const selectRecommendationsQuery = require('../../db/queries/recommendations/selectRecommendationsQuery');

const listRecommendations = async (req, res, next) => {
    try {
        //importamos la query que nos devuelve las recomendaciones filtadas por categoria y lugar
        const { category, place } = req.query;

        const recommendations = await selectRecommendationsQuery(req.user?.id, category, place);
        
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