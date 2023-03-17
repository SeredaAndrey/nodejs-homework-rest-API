const gravatar = require("gravatar");

const { userSchema } = require("../service/Validate/userValidate");
const { registration, login, logout } = require("../service/authService");
const { ConflictError } = require("../errorHandler/errors");

const registrationController = async (req, res, next) => {
  const reqValidate = userSchema.validate(req.body);
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", r: "x", d: "retro" }, true);
  try {
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
      throw new ConflictError(reqValidate.error);
    }
  } catch (e) {
    throw new ConflictError(e);
  }
};
const loginController = async (req, res, next) => {
  const reqValidate = userSchema.validate(req.body);
  const { email, password } = req.body;
  try {
    if (!reqValidate.error) {
      const data = await login(email, password);
      console.log("data: ", data);
      if (!data.token) {
        return res.status(401).json({
          code: 401,
          message: "Email or password is wrong",
        });
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
      return res.status(400).json({
        message: reqValidate.error,
        code: 400,
      });
    }
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const logoutController = async (req, res, next) => {
  const userId = req.user._id;
  try {
    await logout(userId);
    return res.status(204).json({
      code: 204,
    });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
