const express = require('express')
const router = express.Router();

const {registerUser, loginUser, getProfile} = require('../controllers/authController')

const {isAuthenticated} = require("../middlewares/authMiddleware");


router.get("/profile",isAuthenticated,getProfile);
router.post('/register',registerUser);
router.post('/login',loginUser);
// router.post("/jobs",isAuthenticated,authorizeRoles("recruiter"),createJob);

module.exports = router;
