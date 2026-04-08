const express = require("express");
const router = express.Router();



const { loginUser, checkAuth, logoutUser ,signupUser,forgotPassword, verifyOtp } = require("../Controllers/authController");

router.post("/login", loginUser);

router.get("/check-auth", checkAuth);

router.get("/logout", logoutUser);
router.post("/signup", signupUser);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
//router.post("/")

module.exports = router;