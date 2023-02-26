const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const {v4: uuid} = require('uuid');

const generateError = (msg, status) => {
    const err = new Error(msg);
    err.httpStatus = status;
    throw err;
};

const saveImg = async (img, resizePx) => {
    //Absolute path to the directory where upload the photo.
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

    try {
        await fs.access(uploadsPath);
    } catch { 
    await fs.mkdir(uploadsPath);
}

//Turn the photo into a type sharp object.
const sharpImg = sharp(img.data);

//Resize the photo; width: 100px.
sharpImg.resize(resizePx);

//Name for the photo.
const imgName = `${uuid()}.jpg`;

//Absolute path of the photo.
const imgPath = path.join(uploadsPath, imgName);

//Save the photo.
await sharpImg.toFile(imgPath);

return imgName;

};

//Delete photo.
const deleteImg = async (imgName) => {
    try {
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

        try {
            await fs.access(imgPath);
        } catch (error) {
            return;
        }
        await fs.unlink(imgPath);
    } catch {
        generateError('Error deleting image from server.');
    }
};


module.exports = {
    generateError,
    saveImg,
    deleteImg,
};