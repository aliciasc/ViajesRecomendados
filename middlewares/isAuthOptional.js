const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const isAuthOptional = async (req, res, next) => {
    try {
        //Get the header token.
        const { authorization } = req.headers;

        //si existe token creamos la propiedad user en el objeto request.
        //de lo contrario pasa al siguiente middleware.
        if (authorization) {
            let userInfo;

            try {
                userInfo = jwt.verify(authorization, process.env.SECRET);
            } catch {
                console.error(err);
                generateError('Wrong token.', 401);
            }

            // Add a new feature to the request.
            req.user = userInfo;
        }

        // Pass control to the next middleware or controller function.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuthOptional;
