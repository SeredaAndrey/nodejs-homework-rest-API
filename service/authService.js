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
  // console.log("email, password", email, password);
  const user = await User.findOne({ email });
  // console.log("user: ", user);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("correct!!!");
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );
    console.log("token: ", token);
    await User.findOneAndUpdate({ email }, { token: token }, { new: true });
    return {
      token: token,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    };
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
