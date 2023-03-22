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

const verification = async (email) => {
  const data = await User.findOne({
    email,
    verify: false,
  });
  if (!data) {
    return;
  }
  return await User.findByIdAndUpdate(
    { _id: data._id },
    { verificationToken: null, verify: true },
    { new: true }
  );
};

module.exports = {
  patchSubscription,
  patchAvatar,
  verification,
};
