const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');
const deleteRecommendationQuery = require('../../db/queries/recommendations/deleteRecommendationQuery');
const { generateError, deleteImg } = require('../../helpers');
const deleteRecommendation = async (req, res, next) => {

try {
    const { idRecommendation} = req.params;

    //Check if we own the recommendation.
    const [recommendation] = await selectRecommendationByIdQuery(idRecommendation,req.user.id);

    if (recommendation.idUser !== req.user.id) {
        generateError('You do not have permissions.', 401);
    }

    //Delete the disk image if we are the owners.
    if (recommendation.photo) {
        await deleteImg(recommendation.photo);
    }

    //Delete the recommendation.
    await deleteRecommendationQuery(idRecommendation);

    res.send ({
        status: 'ok',
        message: 'Recommendation deleted.'
    });


} catch (err) {
    next(err);
}
};

module.exports = deleteRecommendation;