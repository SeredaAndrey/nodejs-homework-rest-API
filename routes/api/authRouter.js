const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controller/authController");

const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/registration", registrationController);

router.post("/login", loginController);

router.use(authMaiddleware);

router.get("/logout", logoutController);

module.exports = router;
