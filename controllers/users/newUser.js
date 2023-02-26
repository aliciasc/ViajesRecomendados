const insertUserQuery = require('../../db/queries/users/insertUserQuery');

const { generateError } = require('../../helpers');

// Controller function.

const newUser = async (req, res, next) => {
try{

    //Get the name, email, password, photo and biography of the body.
    const {name, email, password, photo, biography} = req.body;

    // Throw an error if any field is missing.
    if (!name || !email || !password || !photo || !biography) {
        generateError('Missing any field.', 400);
    }

    //Create the user.
    await insertUserQuery(name, email, password, photo, biography);
    
    res.send({
        status: 'ok',
        message: 'User created',
    });

} catch (err) {
    next(err);
}
};


module.exports = newUser;