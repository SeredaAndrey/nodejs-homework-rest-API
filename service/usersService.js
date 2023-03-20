const User = require("./schemas/userSchema");

const patchSubscription = async (_id, subscription) => {
  return await User.findOneAndUpdate(
    { _id },
    { subscription: subscription },
    { new: true }
  );
};

const patchAvatar = async (_id, filePathName) => {
  return await User.findOneAndUpdate(
    { _id },
    { avatarURL: filePathName },
    { new: true }
  );
};

module.exports = {
  patchSubscription,
  patchAvatar,
};
