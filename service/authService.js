const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./schemas/userSchema");

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    return;
  }

  const newUser = new User({ email, password });
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
    return { token: token, subscription: user.subscription };
  }
  return {
    code: 401,
    message: "Email or password is wrong",
  };
};

const logout = async (_id) => {
  return await User.findOneAndUpdate({ _id }, { token: null }, { new: true });
};

module.exports = {
  registration,
  login,
  logout,
};
