const { registration } = require("../service/authService");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await registration(email, password);
    res.status(201).json({
      message: "created",
      code: 201,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};
const loginController = async (req, res, next) => {};

module.exports = {
  registrationController,
  loginController,
};
