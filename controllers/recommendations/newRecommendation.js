const newRecommendationQuery = require('../../db/queries/recommendations/newRecommendationQuery');

const { generateError, saveImg} = require('../../helpers');

const newRecommendation = async (req, res, next) => {
    try {

        const { title, category, place, summary, text } = req.body;

        if (!title || !category || !place || !summary || !text ) {
            generateError('Faltan campos', 400);
        }

        let photo;

        if(req.files?.photo) { 
            photo = await saveImg(req.files.photo, 500);
        }

        //Create the recommendation and get the data.
        const recommendation = await newRecommendationQuery( title, category, place, summary, text ,photo, req.user.id);

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