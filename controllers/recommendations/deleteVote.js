const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');
const deleteVoteQuery = require('../../db/queries/recommendations/deleteVoteQuery');

const deleteVote = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;

        //Check if exists the recommendation.
        await selectRecommendationByIdQuery(idRecommendation);

        // Delete the vote.
        await deleteVoteQuery(idRecommendation, req.user.id);

        res.send({
            status: 'ok',
            message: 'Vote deleted',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteVote;
