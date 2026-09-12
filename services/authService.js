const axios = require('axios');
const config = require('../config/config');

let cachedToken = null;
let tokenExpiry = null;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(`${config.nibssBaseUrl}/auth/token`, {
    apiKey: config.nibssApiKey,
    apiSecret: config.nibssApiSecret,
  });

  cachedToken = response.data.token;
  tokenExpiry = Date.now() + 55 * 60 * 1000;
  return cachedToken;
}

module.exports = { getToken };