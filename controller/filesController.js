const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const FILE_DIR = path.resolve("./public/avatars");

const parseAvatar = async (path) => {
  const filePathName = `${FILE_DIR}${uuidv4()}.jpg`;
  return Jimp.read(path)
    .then((image) => {
      image.resize(250, 250).quality(60).write(filePathName);
    })
    .catch((e) => {
      return { message: e };
    });
};

const filesUploadController = async (req, res, next) => {
  try {
    return res.status(200).json({
      code: 200,
      message: "succes",
      avatarURL: await parseAvatar(req.file.path),
    });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

module.exports = {
  filesUploadController,
};
