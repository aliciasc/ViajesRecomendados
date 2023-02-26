const newRecommendationQuery = require('../../db/queries/recommendations/newRecommendationQuery');

const { generateError, saveImg} = require('../../helpers');

const newRecommendation = async (req, res, next) => {
    try {
        const { tittle, category, place, summary, text } = req.body;

        if (!tittle || !category || !place || !summary || !text ) {
            generateError('Faltan campos', 400);
        }

        let photo;

        if(req.files?.photo) { 
            photo = await saveImg(req.files.photo, 500);
        }

        // Creamos el tweet y obtenemos sus datos.
        const recommendation = await newRecommendationQuery( tittle, category, place, summary, text ,photo, req.user.id);

        res.send({
            status: 'ok',
            data: {
                recommendation
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = newRecommendation;