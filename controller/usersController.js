const { ValidateError } = require("../errorHandler/errors");
const { patchSubscription } = require("../service/usersService");
const { patchSubscriptionShema } = require("../service/Validate/userValidate");

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

module.exports = {
  patchSubscriptionController,
};
