const axios = require('axios');
const config = require('../config/config');

const { getToken } = require('./authService');

async function authHeader() {
  const token = await getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
}

// { name, email } — no "companyName" field
async function onboardBank() {
  const response = await axios.post(`${config.nibssBaseUrl}/fintech/onboard`, {
    name: config.bankName,
    email: config.bankEmail,
  });
  return response.data; // returns apiKey + apiSecret
}


// { bvn, firstName, lastName, dob, phone }
async function insertBvn({ bvn, firstName, lastName, dob, phone }) {
  const response = await axios.post(
    `${config.nibssBaseUrl}/insertBvn`,
    { bvn, firstName, lastName, dob, phone },
    await authHeader()
  );
  return response.data;
}

// { nin, firstName, lastName, dob }
async function insertNin({ nin, firstName, lastName, dob }) {
  const response = await axios.post(
    `${config.nibssBaseUrl}/insertNin`,
    { nin, firstName, lastName, dob },
    await authHeader()
  );
  return response.data;
}

// confirm{ bvn }
async function validateBvn(bvn) {
  const response = await axios.post(`${config.nibssBaseUrl}/validateBvn`, { bvn }, await authHeader());
  return response.data;
}

// Confirm{ nin }
async function validateNin(nin) {
  const response = await axios.post(`${config.nibssBaseUrl}/validateNin`, { nin }, await authHeader());
  return response.data;
}

// { kycType: "BVN" | "NIN", kycID, dob }
async function createAccountKyc({ kycType, kycID, dob }) {
  const response = await axios.post(
    `${config.nibssBaseUrl}/account/create`,
    { kycType, kycID, dob },
    await authHeader()
  );
  return response.data; // should include the new accountNumber
}

// accountNumber goes in the URL
async function nameEnquiry(accountNumber) {
  const response = await axios.get(
    `${config.nibssBaseUrl}/account/name-enquiry/${accountNumber}`,
    await authHeader()
  );
  return response.data;
}

// { from, to, amount } — NO type field
async function transferFunds({ from, to, amount }) {
  const response = await axios.post(
    `${config.nibssBaseUrl}/transfer`,
    { from, to, amount },
    await authHeader()
  );
  return response.data;
}

// { ref } — no body
async function checkTransactionStatus(ref) {
  const response = await axios.get(`${config.nibssBaseUrl}/transaction/${ref}`, await authHeader());
  return response.data;
}

// no parameters at all
async function getAllAccounts() {
  const response = await axios.get(`${config.nibssBaseUrl}/accounts`, await authHeader());
  return response.data;
}

// { accountNumber } — no body
async function getBalance(accountNumber) {
  const response = await axios.get(`${config.nibssBaseUrl}/account/balance/${accountNumber}`, await authHeader());
  return response.data;
}

module.exports = {
  onboardBank,
  insertNin,
  insertBvn,
  validateNin,
  validateBvn,
  createAccountKyc,
  nameEnquiry,
  transferFunds,
  checkTransactionStatus,
  getAllAccounts,
  getBalance,
};