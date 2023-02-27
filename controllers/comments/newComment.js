const newCommentQuery = require('../../db/queries/comments/newCommentQuery');
const { generateError, saveImg} = require('../../helpers');

const newComment = async (req, res, next) => {
    try {
        const { comment } = req.body;

        if (!comment ) {
            generateError('Faltan campos', 400);
        }

        // Creamos el comentario y obtenemos sus datos.
        const Comment = await newCommentQuery( comment, req.user.id);

        res.send({
            status: 'ok',
            data: {
                comment
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = newComment;