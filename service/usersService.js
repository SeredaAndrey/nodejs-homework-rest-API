const User = require("./schemas/userSchema");

const patchSubscription = async (_id, subscription) => {
  return await User.findOneAndUpdate(
    { _id },
    { subscription: subscription },
    { new: true }
  );
};

module.exports = {
  patchSubscription,
};
