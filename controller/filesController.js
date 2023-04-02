const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs").promises;
const path = require("path");

const TEMP_UPL_FILE_DIR = path.resolve("./tmpUPL");
const TEMP_DWL_FILE_DIR = path.resolve("./tmpDWL");

const { patchAvatar } = require("../service/usersService");

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const bucketName = "andrii-test-bucket";

const upploadToGCS = async (filePathName, fileName) => {
  try {
    await storage
      .bucket(bucketName)
      .upload(filePathName, { destination: fileName });
  } catch (error) {
    return error;
  }
};

const downloadFromGCS = async (fileName) => {
  try {
    const destFileName = path.join(TEMP_DWL_FILE_DIR, fileName);
    return await storage
      .bucket(bucketName)
      .file(fileName)
      .download({ destination: destFileName });
  } catch (error) {
    return error;
  }
};

const filesUploadController = async (req, res, next) => {
  const fileName = `${uuidv4()}.jpg`;
  const { _id } = req.user;
  try {
    await upploadToGCS(req.file.path, fileName);
    const data = await patchAvatar(_id, fileName);
    if (data) {
      return res.status(200).json({
        code: 200,
        message: "succes",
        avatarURL: fileName,
      });
    }
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const fileDownloadController = async (req, res, next) => {
  const fileName = req.path.split("/")[1];
  try {
    await downloadFromGCS(fileName);
    next();
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const deleteTempFile = async () => {
  try {
    const dwlFiles = await fs.readdir(TEMP_DWL_FILE_DIR);
    const uplFiles = await fs.readdir(TEMP_UPL_FILE_DIR);
    dwlFiles.map((filename) => fs.unlink(`${TEMP_DWL_FILE_DIR}/${filename}`));
    uplFiles.map((filename) => fs.unlink(`${TEMP_UPL_FILE_DIR}/${filename}`));
  } catch (error) {
    return error;
  }
};

module.exports = {
  filesUploadController,
  fileDownloadController,
  deleteTempFile,
};
