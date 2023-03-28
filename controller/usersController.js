const {
  ValidateError,
  FoundingError,
  AutorizationError,
} = require("../errorHandler/errors");
const { patchSubscription, verification } = require("../service/usersService");
const { patchSubscriptionShema } = require("../service/Validate/userValidate");
const jwt = require("jsonwebtoken");

const patchSubscriptionController = async (req, res, next) => {
  const _id = req.user._id;
  const reqValidate = patchSubscriptionShema.validate(req.body);
  const { subscription } = req.body;

  if (!reqValidate.error) {
    const data = await patchSubscription(_id, subscription);
    if (data) {
      return res.status(204).json({
        code: 204,
        message: `subscription changed to ${subscription}`,
      });
    }
  } else {
    throw new ValidateError(reqValidate.error);
  }
};

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params;
  const decode = jwt.decode(verificationToken, process.env.JWT_VERIFY_SECRET);
  if (!decode) {
    throw new AutorizationError("Invalid token");
  }
  const data = await verification(decode.email);
  if (data) {
    return res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } else {
    throw new FoundingError("User not found");
  }
};

module.exports = {
  patchSubscriptionController,
  verificationController,
};
