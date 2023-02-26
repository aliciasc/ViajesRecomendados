const selectUserByEmailQuery = require('../../db/queries/users/selectUserByEmailQuery'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {

    try {
        //Get the email and the password.
        const {email, password} = req.body;

        //Si falta algún dato lanzamos un error.
        if (!email || !password) {
            generateError('Missing fields.', 400);
        }

        //Obtenemos al usuario con el email.
        const user = await selectUserByEmailQuery(email);

        //Comprobar si la contraseña es válida.
        const validPassword = await bcrypt.compare(password, user.password);

        //Si las confraseñas coinciden.
        if (!validPassword) {
            generateError('Wrong password.',401);
        }

        //Objeto con información para token.
        const userInfo = {
            id: user.id,
        };

        //Creamos token.
        const token = jwt.sign(userInfo, process.env.SECRET, {
            expiresIn: '5d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        })
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;