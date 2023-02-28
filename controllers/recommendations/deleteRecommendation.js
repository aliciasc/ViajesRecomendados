const { selectRecommendationQuery, deleteRecommendationQuery, deleteVotesQuery } = require('../../queries/recommendations');
const { generateError } = require('../../../helpers');

const deleteRecommendation = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;
        //comprobamos si el usuario es el propietario de la recomendación
        const recommendation = await selectRecommendationQuery(idRecommendation);

        //si no es el propietario de la recomendación, lanzamos un error
        if (recommendation.idUser !== req.user?.id) {
            generateError('No tienes permisos para borrar esta recomendacion', 401);
        }
        //si la recomendacion tiene imagen, la borramos
        if (recommendation.photo) {
            await deleteFile(recommendation.photo);
        }
        //borramos los votos de la recomendación
        if (recommendation.vote) {
            await deleteVotesQuery(idRecommendation);
        }
        //borramos la recomendación
        await deleteRecommendationQuery(idRecommendation);

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

module.exports = deleteRecommendation;