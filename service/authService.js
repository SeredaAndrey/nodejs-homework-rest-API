const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./schemas/userSchema");

const registration = async (email, password, avatarURL) => {
  const user = await User.findOne({ email });

  if (user) {
    return;
  }

  const newUser = new User({ email, password, avatarURL });
  await newUser.save();
  return newUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );
    await User.findOneAndUpdate({ email }, { token: token }, { new: true });
    return {
      token: token,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    };
  }
};

const logout = async (_id) => {
  return await User.findOneAndUpdate({ _id }, { token: null }, { new: true });
};

module.exports = {
  registration,
  login,
  logout,
};
