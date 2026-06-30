const cloudinary = require("cloudinary").v2;

const deleteFromCloudinary = async (
    publicId,
    resourceType = "image"
) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });

};

module.exports = deleteFromCloudinary;
