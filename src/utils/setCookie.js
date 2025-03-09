const jwt = require("jsonwebtoken");

const setCookie = async (res, id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const options = {
    // httpOnly: true,
    // samesite: "none",
    // secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  };
  res.cookie("token", token, options);
  return token;
};

module.exports = setCookie;
