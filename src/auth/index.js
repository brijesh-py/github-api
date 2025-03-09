const axios = require("axios");

const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user,gist,user:email`;

const oauthGithubURL = "https://github.com/login/oauth/access_token";

const oauthGithubParams = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
};
const oauthGithubHeaders = {
  headers: { Accept: "application/json" },
};

const getGithubEmail = async (token) => {
  const response = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data[0]?.email;
};

const getGithubUser = async (token) => {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  const { login, id, avatar_url, name, two_factor_authentication } =
    response.data;
  return {
    login,
    id,
    avatar_url,
    name,
    two_factor_authentication,
    email: await getGithubEmail(token),
  };
};

const getGithubAccessToken = async (code) => {
  const response = await axios.post(
    oauthGithubURL,
    { ...oauthGithubParams, code },
    oauthGithubHeaders
  );
  return response.data;
};

module.exports = { githubAuthURL, getGithubAccessToken, getGithubUser };
