const userService = require("../services/userService");
const { asyncWrapper, response, setCookie } = require("../utils");
const {
  githubAuthURL,
  getGithubUser,
  getGithubAccessToken,
} = require("../auth");

class UserController {
  handleAuth = asyncWrapper(async (req, res) => {
    res.redirect(githubAuthURL);
  });

  handleCallback = asyncWrapper(async (req, res) => {
    const { code } = req.query;
    const { access_token } = await getGithubAccessToken(code);
    // const {
    //   login: username,
    //   id,
    //   avatar_url,
    //   email,
    //   name,
    // } = await getGithubUser(access_token);
    // const user = await userService.createUser({
    //   id,
    //   username,
    //   email,
    //   avatar_url,
    //   name,
    // });
    // const token = await setCookie(res, user._id);

    res.cookie("access_token", access_token, {
      // httpOnly: true,
      samesite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.redirect(`${process.env.FRONTEND_URL}`);
  });

  handleGetUser = asyncWrapper(async (req, res) => {
    const { id } = req.user;
    const user = await userService.getUser(id);
    response(res, { status: 200, message: "User found", user });
  });
}

module.exports = new UserController();
