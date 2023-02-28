const newRecommendation = require('./newRecommendation');
const listRecommendations = require('./listRecommendations');
const getRecommendation = require('./getRecommendation');
const voteRecommendation = require('./voteRecommendation');
const deleteVote = require('./deleteVote');
const deleteRecommendation = require("./deleteRecommendation");



module.exports = {
    newRecommendation,
    listRecommendations,
    getRecommendation,
    voteRecommendation,
    deleteVote,
    deleteRecommendation
};