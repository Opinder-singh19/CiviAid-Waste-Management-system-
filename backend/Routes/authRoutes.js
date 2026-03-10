const express = require("express");
const router = express.Router();

const { loginUser, checkAuth, logoutUser ,signupUser} = require("../Controllers/authController");

router.post("/login", loginUser);

router.get("/check-auth", checkAuth);

router.get("/logout", logoutUser);
router.post("/signup", signupUser);

module.exports = router;