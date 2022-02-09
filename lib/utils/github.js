const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  const { access_token: accessToken } = await response.json();

  return accessToken;
};

const getGithubProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });
  const user = await response.json();

  return user;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
