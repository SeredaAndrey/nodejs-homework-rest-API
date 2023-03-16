const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controller/authController");
const { asyncWrapper } = require("../../errorHandler/errors");

const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/registration", asyncWrapper(registrationController));

router.post("/login", asyncWrapper(loginController));

router.use(authMaiddleware);

router.get("/logout", asyncWrapper(logoutController));

module.exports = { authRouter: router };
