const jwt = require("jsonwebtoken");
const { asyncWrapper, AuthError } = require("../utils");

const protect = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token || token == "null") {
    res.clearCookie("token");
    throw new AuthError({
      message: "Unauthorized access",
      error: "Unauthorized",
      statusCode: 401,
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  if (!req.user) {
    res.clearCookie("token");
    throw new AuthError({
      message: "Unauthorized access",
      error: "Unauthorized",
      statusCode: 401,
    });
  }
  next();
});

module.exports = { protect };
