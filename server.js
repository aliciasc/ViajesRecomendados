require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

//Create the server.
const app = express ();

//Middelware que muestra información por consola sobre la petición entrante.
app.use(morgan('dev'));

//Middleware que permite deserializar un body en formato "raw" creando la propiedad "body" en el objeto "request".
app.use(express.json());

//Middleware que permite deserializar un body en formato "form-data" creando la propiedad "body" y "files" en el objeto "request".
app.use(fileUpload());

//////////////////////////
//Personalized middlewares.
const isAuth = require('./middlewares/isAuth');
const isAuthOptional = require('./middlewares/isAuthOptional');

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
const { listRecommendations, getRecommendation, newRecommendation, voteRecommendation } = require('./controllers/recommendations');


//Create recommendation.
app.post('/recommendations', isAuth, newRecommendation);

//List recommendations.
app.get('/recommendations', isAuthOptional, listRecommendations);

//Get recommendation.
app.get('/recommendations/:idRecommendation', isAuthOptional, getRecommendation);

//Vote the recommendation.
app.post('/recommendations/:idRecommendation/vote', isAuth, voteRecommendation);

//Comments controllers
const { newComment } = require('./controllers/comments');

//Create comment.
app.post('/comments', isAuth, newComment);



//Middleware error.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

//Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});