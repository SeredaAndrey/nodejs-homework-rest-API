const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { patchAvatar } = require("../service/usersService");

const FILE_DIR = path.resolve("./public/avatars");

const convertAvatar = async (path, filePathName) => {
  return Jimp.read(path)
    .then((image) => {
      image.resize(250, 250).quality(60).write(filePathName);
    })
    .catch((e) => {
      return { message: e };
    });
};

const filesUploadController = async (req, res, next) => {
  const filePathName = path.join(FILE_DIR, `${uuidv4()}.jpg`);
  convertAvatar(req.file.path, filePathName);
  const { _id } = req.user;
  try {
    const data = await patchAvatar(_id, filePathName);
    if (data) {
      return res.status(200).json({
        code: 200,
        message: "succes",
        avatarURL: filePathName,
      });
    }
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

module.exports = {
  filesUploadController,
};
