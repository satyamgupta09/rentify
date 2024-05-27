const express = require("express");
const { register, login, sendEmail } = require("../controllers/userController");
const { jwtAuthMiddleWareUser } = require("../middlewares.js/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/sendEmail", jwtAuthMiddleWareUser, sendEmail);

module.exports = router;
