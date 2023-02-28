const newCommentQuery = require('../../db/queries/comments/newCommentQuery');
const { generateError, saveImg} = require('../../helpers');

const newComment = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { idRecommendation } = req.params;

        if (!comment ) {
            generateError('Faltan campos', 400);
        }

        // Create comment and get the dates.
        const Comment = await newCommentQuery( comment, req.user.id,idRecommendation);

        res.send({
            status: 'ok',
            data: {
                Comment
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = newComment;