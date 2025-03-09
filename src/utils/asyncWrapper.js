const jwt = require("jsonwebtoken");
const DBError = require("./DBError");
const AuthError = require("./AuthError");

const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    let statusCode = 500;
    const response = { success: false, error: "Internal server error" };
    if (error instanceof jwt.JsonWebTokenError) {
      statusCode = 401;
      response.message = error.message;
      response.error = "Unauthorized";
    }
    if (error instanceof DBError || error instanceof AuthError) {
      res.clearCookie("token");
      statusCode = error.statusCode;
      response.message = error.message;
      response.error = error.error;
    } else if (process.env.NODE_ENV === "development") {
      response.message = error.message;
      console.error(error);
    } else {
      response.message = "Something went wrong";
    }
    return res.status(statusCode).json(response);
  }
};

module.exports = asyncWrapper;
