// import cloudinary from "../config/cloudinary.js";
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, folder,resource_type="auto") => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });
};

module.exports = uploadToCloudinary;