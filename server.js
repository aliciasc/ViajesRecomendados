require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

//Create the server.
const app = express ();

//Middelware that displays information on the console about the incoming request.
app.use(morgan('dev'));

//Middleware that allows deserializing a body in "raw" format by creating the "body" property on the "request" object.
app.use(express.json());

//Middleware that allows to deserialize a body in "form-data" format by creating the "body" property and "files" in the "request" object.
app.use(fileUpload());


/*************************/
//Personalized middlewares.
const isAuth = require('./middlewares/isAuth');
const isAuthOptional = require('./middlewares/isAuthOptional');


/* 
********************
*******Users*******
********************
*/

//Users controllers
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/loginUser');
const getOwnUser = require('./controllers/users/getOwnUser');
const editUser = require('./controllers/users/editUser');
const editUserPhoto = require('./controllers/users/editUserPhoto');

//Sign up.
app.post('/users', newUser); 

// Login user.
app.post('/users/login', loginUser);

//Token user information.
app.get('/users', isAuth, getOwnUser);

//Update username and email or both.
app.put('/users', isAuth, editUser);

//Update user photo.
app.put('/users/photo', isAuth, editUserPhoto);


/* 
********************
***Recommendation***
********************
*/

//Recommendations controllers
const { listRecommendations, getRecommendation, newRecommendation, voteRecommendation, deleteVote, deleteRecommendation } = require('./controllers/recommendations');

//Create recommendation.
app.post('/recommendations', isAuth, newRecommendation);

//List recommendations.
app.get('/recommendations', isAuthOptional, listRecommendations);

//Get recommendation.
app.get('/recommendations/:idRecommendation', isAuthOptional, getRecommendation);

//Vote the recommendation.
app.post('/recommendations/:idRecommendation/vote', isAuth, voteRecommendation);

//Remove a vote.
app.delete('/recommendations/:idRecommendation/vote', isAuth, deleteVote);

//Remove a recommendation.
app.delete('/recommendations/:idRecommendation', isAuth, deleteRecommendation);


/* 
********************
*******Comment******
********************
*/

//Comments controllers
const { newComment, deleteComment } = require('./controllers/comments');

//Create comment.
app.post('/comments/:idRecommendation/comment', isAuth, newComment);

//Remove a recommendation.
app.delete('/comments/:idRecommendation/comment', isAuth, deleteComment);

//Middleware error.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

//Middleware path not found.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});