const selectUserByEmailQuery = require('../../db/queries/users/selectUserByEmailQuery'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {

    try {
        //Get the email and the password.
        const {email, password} = req.body;

        //Throw error if any data is missing.
        if (!email || !password) {
            generateError('Missing fields.', 400);
        }

        //Get the user with the email.
        const user = await selectUserByEmailQuery(email);

        //Check if the password is valid.
        const validPassword = await bcrypt.compare(password, user.password);

        //Throw error if passwords do not match.
        if (!validPassword) {
            generateError('Wrong password.',401);
        }

        //Object with information for token.
        const userInfo = {
            id: user.id,
        };

        //Create token.
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