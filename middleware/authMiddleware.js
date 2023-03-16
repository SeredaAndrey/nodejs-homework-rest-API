const jwt = require("jsonwebtoken");
const { AutorizationError } = require("../errorHandler/errors");

const authMaiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // return next(
    //   new AutorizationError(
    //     "Please, provide a token in request authorization header"
    //   )
    // );
    return next(
      res.status(401).json({
        message: "Please, provide a token in request authorization header",
        code: 401,
      })
    );
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    // return next(new AutorizationError("Not authorized"));
    return next(
      res.status(401).json({
        message: "Not authorized",
        code: 401,
      })
    );
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    next(res.status(401).json({ message: e }));
    // next(new AutorizationError("Invalid token"));
  }
};

module.exports = { authMaiddleware };
