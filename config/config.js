require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nibssBaseUrl: process.env.NIBSS_BASE_URL,
  bankName: process.env.BANK_NAME,
  bankEmail: process.env.BANK_EMAIL,
  nibssAuthToken: process.env.NIBSS_AUTH_TOKEN,
  nibssApiKey: process.env.NIBSS_API_KEY,
  nibssApiSecret: process.env.NIBSS_API_SECRET,
  mongoUri: process.env.MONGO_URI,
};