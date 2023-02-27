const selectRecommendationByIdQuery = require('../../db/queries/recommendations/selectRecommendationByIdQuery');
const insertVoteQuery = require('../../db/queries/recommendations/insertVoteQuery');

const { generateError } = require('../../helpers');

const voteRecommendation = async (req, res, next) => {
    try {
        const { idRecommendation } = req.params;

        const { vote } = req.body;

        const recommendation = await selectRecommendationByIdQuery(idRecommendation, req.user.id);

        //Throw an error if we are the recommendation owner.
        if (recommendation[0].owner) {
            generateError('You cannot vote on your own recommendations.', 401);
        }

        if (!vote) {
            generateError('Missing fields.', 400);
        }

        //Array with valid votes.
        const validVotes = [1, 2, 3, 4, 5];

        //Throw an error if the vote is not valid.
        if (!validVotes.includes(vote)) {
            generateError('Invalid vote', 400);
        }

        //Vote the recommendation.
        await insertVoteQuery(req.user.id, idRecommendation, vote);


        res.send({
            status: 'ok',
            message: 'Voted.',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = voteRecommendation;
