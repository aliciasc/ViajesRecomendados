const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const isAuth = async (req, res, next) => {
    try {
        //Get the header token.
        const { authorization } = req.headers;

        //Throw an error if the token is missing.
        if (!authorization) {
            generateError('Missing authorization header.', 401);
        }

        let userInfo;

        try {
            // Try to get the token info.
            userInfo = jwt.verify(authorization, process.env.SECRET);
        } catch {
            generateError('Wrong token.', 401);
        }

        // Add a new feature to the request.
        req.user = userInfo;

        // Pass control to the next middleware or controller function.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuth;
