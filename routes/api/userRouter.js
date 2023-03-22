const express = require("express");
const {
  patchSubscriptionController,
  verificationController,
} = require("../../controller/usersController");
const { asyncWrapper } = require("../../errorHandler/errors");
const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/verify/:verificationToken", asyncWrapper(verificationController));

router.use(authMaiddleware);

router.patch("/subscription", asyncWrapper(patchSubscriptionController));

module.exports = { userRouter: router };
