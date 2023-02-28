const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');
const deleteCommentQuery = require('../../db/queries/comments/deleteCommentQuery');

const deleteComment = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;

        //Check if exists the recommendation.
        await selectRecommendationByIdQuery(idRecommendation);

        // Delete the vote.
        await deleteCommentQuery(idRecommendation, req.user.id);

        res.send({
            status: 'ok',
            message: 'Comment deleted',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteComment;
