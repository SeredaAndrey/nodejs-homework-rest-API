const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const {
  filesUploadController,
  fileDownloadController,
} = require("../../controller/filesController");

const { authMaiddleware } = require("../../middleware/authMiddleware");

const TEMP_UPL_FILE_DIR = path.resolve("./tmpUPL");
const TEMP_DWL_FILE_DIR = path.resolve("./tmpDWL");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPL_FILE_DIR);
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

router.use(
  "/avatars",
  fileDownloadController,
  express.static(TEMP_DWL_FILE_DIR)
);

module.exports = { filesRouter: router };
