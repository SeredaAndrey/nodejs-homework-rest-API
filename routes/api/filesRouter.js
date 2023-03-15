const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const { filesUploadController } = require("../../controller/filesController");

const { authMaiddleware } = require("../../middleware/authMiddleware");

const TEMP_FILE_DIR = path.resolve("./tmp");
const FILE_DIR = path.resolve("./public/avatars");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.use(authMaiddleware);

router.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  filesUploadController
);

router.use("/avatars", express.static(FILE_DIR));

module.exports = { filesRouter: router };
