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