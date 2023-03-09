const User = require("./schemas/userSchema");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

const login = async () => {
  return User.findOne();
};

module.exports = {
  registration,
  login,
};
