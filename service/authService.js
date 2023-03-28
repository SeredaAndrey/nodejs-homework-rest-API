const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const sha256 = require("sha256");
const sgMail = require("@sendgrid/mail");

const User = require("./schemas/userSchema");
const { FoundingError } = require("../errorHandler/errors");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (email, password, avatarURL) => {
  const user = await User.findOne({ email });
  const verificationToken = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_VERIFY_SECRET
  );

  if (user) {
    return;
  }

  const newUser = new User({ email, password, avatarURL, verificationToken });
  await newUser.save();

  const msgVerify = {
    to: email,
    from: "a.sereda@i.ua",
    subject: "Thank you for registration!",
    text: `Please, confirm your email address POST http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `Please, confirm your email address POST http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msgVerify);

  return newUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
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
  } else {
    throw new FoundingError("User not found");
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
