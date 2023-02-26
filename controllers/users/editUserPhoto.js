const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const updatePhotoUserQuery = require('../../db/queries/users/updatePhotoUserQuery');

const { saveImg, deleteImg, generateError } = require("../../helpers");

const editUserPhoto = async (req, res, next) => {

    try {
        // Throw error if there is no photo.
        if (!req.files?.photo) {
            generateError('Missing files.', 400)
        }

        //Get user data to check if there is a photo.
        const user = await selectUserByIdQuery(req.user.id);


        //If there is a previous photo, remove it from the server.
        if (user.photo) {

            //Delete the photo from the server.
           await deleteImg(user.photo);
        }


        //Save the photo on the server and get the name.
        const photo = await saveImg(req.files.photo, 100);

        //Update the photo.
        await updatePhotoUserQuery(photo, req.user.id);


        res.send({
            status: 'ok',
            message: 'Updated user.'
        });


    } catch (err) {
        next(err);
    }

};

module.exports = editUserPhoto;