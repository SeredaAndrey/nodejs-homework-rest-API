const express = require("express");
const {
  getContactController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController,
  changeFavoritContactController,
} = require("../../controller/contactsControllers");
const { asyncWrapper } = require("../../errorHandler/errors");
const { authMaiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authMaiddleware);

router.get("/", asyncWrapper(getContactController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put("/:contactId", asyncWrapper(changeContactController));

router.put(
  "/:contactId/favorite",
  asyncWrapper(changeFavoritContactController)
);

module.exports = { contactsRouter: router };
