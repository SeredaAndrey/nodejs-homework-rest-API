const gravatar = require("gravatar");

const { userSchema } = require("../service/Validate/userValidate");
const { registration, login, logout } = require("../service/authService");
const {
  ConflictError,
  AutorizationError,
  ValidateError,
} = require("../errorHandler/errors");

const registrationController = async (req, res, next) => {
  const reqValidate = userSchema.validate(req.body);
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "retro" }, true);
  if (!reqValidate.error) {
    const user = await registration(email, password, avatarURL);
    if (user) {
      return res.status(201).json({
        message: "created",
        code: 201,
        user: {
          email: email,
          subscription: "starter",
        },
      });
    }
    throw new ConflictError("Email is already in use");
  } else {
    throw new ValidateError(reqValidate.error);
  }
};
const loginController = async (req, res, next) => {
  const reqValidate = userSchema.validate(req.body);
  const { email, password } = req.body;
  if (!reqValidate.error) {
    const data = await login(email, password);
    if (!data.token) {
      throw new AutorizationError("Email or password is wrong");
    }
    return res.status(200).json({
      token: data.token,
      code: 201,
      user: {
        email: email,
        subscription: data.subscription,
        avatarURL: data.avatarURL,
      },
    });
  } else {
    throw new ValidateError(reqValidate.error);
  }
};

const logoutController = async (req, res, next) => {
  const userId = req.user._id;
  await logout(userId);
  return res.status(204).json({
    code: 204,
    message: "user logout",
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
