const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if(file.fieldname === "profilePhoto"){
        const allowedImages = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];
        return cb(null, allowedImages.includes(file.mimetype));
    }
    if(file.fieldname === "resume"){
        return cb(null,file.mimetype === "application/pdf");
    }
     cb(new Error("Invalid input field"));
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;