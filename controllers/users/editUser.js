const updateUserQuery = require('../../db/queries/users/updateUserQuery');

const { generateError} = require('../../helpers');

const editUser = async (req, res, next) => {
    try {
        let {name, email} = req.body;

        //Si faltan todas. PREGUNTAR!!!!!!!!!!!
        if (!name && !email) {
            generateError('Missing fields', 400); 
        }


        //User update.
        await updateUserQuery(name, email, req.user.id);

        res.send({
            status: 'ok',
            messsage: 'Updated user.',
        })

    } catch (err) {
        next(err)
    }
};

module.exports = editUser;