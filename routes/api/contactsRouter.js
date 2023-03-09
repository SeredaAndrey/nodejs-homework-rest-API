const express = require("express");
const {
  getContactController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController,
  changeFavoritContactController,
} = require("../../controller/contactsControllers");

const router = express.Router();

router.get("/", getContactController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactController);

router.delete("/:contactId", removeContactController);

router.put("/:contactId", changeContactController);

router.put("/:contactId/favorite", changeFavoritContactController);

module.exports = router;
