const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');
const insertVoteQuery = require('../../db/queries/recommendations/insertVoteQuery');

const { generateError } = require('../../helpers');

const voteRecommendation = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;

        const { vote } = req.body;

        const recommendation = await selectRecommendationByIdQuery(idRecommendation, req.user.id);

        // Lanzamos un error si somos los dueños del viaje. No queremos permitir votar nuestras propias entradas.
        if (!recommendation.owner) {
            generateError('You cannot vote on your own recommendations.', 401);
        }

        if (!vote) {
            generateError('Missing fields.', 400);
        }

        // Array con los votos válidos.
        const validVotes = [1, 2, 3, 4, 5];

        // Si el voto no es un valor válido lanzamos un error.
        if (!validVotes.includes(vote)) {
            generateError('Invalid vote', 400);
        }

        // Votamos la entrada.
        await insertVoteQuery(idRecommendation, req.user.id, vote);


        res.send({
            status: 'ok',
            message: 'Voted.',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = voteRecommendation;
