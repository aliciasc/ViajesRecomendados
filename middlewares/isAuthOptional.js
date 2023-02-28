const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const isAuthOptional = async (req, res, next) => {
    try {
        //Get the header token.
        const { authorization } = req.headers;

        //If there is a token, we create the user property in the request object, otherwise it goes to the next middleware.
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
