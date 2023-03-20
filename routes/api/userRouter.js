const express = require("express");
const {
  patchSubscriptionController,
} = require("../../controller/usersController");
const { asyncWrapper } = require("../../errorHandler/errors");
const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authMaiddleware);

router.patch("/subscription", asyncWrapper(patchSubscriptionController));

module.exports = { userRouter: router };
