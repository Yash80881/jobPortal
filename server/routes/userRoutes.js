const express = require('express');
const router = express.Router();

const {isAuthenticated} = require('../middlewares/authMiddleware');

const {getProfile, updateProfile} = require('../controllers/userController');

const upload = require("../middlewares/uploadMiddleware");
// const { updateProfilePhoto } = require("../controllers/userController");

router.get("/profile",isAuthenticated,getProfile);

router.put("/profile",isAuthenticated,
    upload.fields([
        { name: "profilePhoto", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    updateProfile
);

module.exports = router;