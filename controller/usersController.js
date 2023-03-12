const { patchSubscription } = require("../service/usersService");
const { patchSubscriptionShema } = require("../service/Validate/userValidate");

const patchSubscriptionController = async (req, res, next) => {
  const { _id } = req.user;
  const reqValidate = patchSubscriptionShema.validate(req.query);
  const { subscription } = req.query;
  try {
    const data = await patchSubscription(_id, subscription);
    if (!reqValidate.error) {
      if (data) {
        return res.status(204).json({
          code: 204,
          message: `subscription changed to ${subscription}`,
        });
      }
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

module.exports = {
  patchSubscriptionController,
};
