const express = require("express");
const {
  patchSubscriptionController,
} = require("../../controller/usersController");

const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authMaiddleware);

router.patch("/subscription", patchSubscriptionController);

module.exports = router;
