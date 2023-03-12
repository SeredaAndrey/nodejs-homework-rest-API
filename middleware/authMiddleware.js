const jwt = require("jsonwebtoken");

const authMaiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(
      res.status(401).json({
        message: "Please, provide a token in request authorization header",
        code: 401,
      })
    );
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    next(
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
  }
};

module.exports = { authMaiddleware };
