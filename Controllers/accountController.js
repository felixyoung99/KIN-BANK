const Customer = require('../models/customer');
const Account = require('../models/account');
const { generateAccountNumber } = require('../Utils/generateAccountNumber');

async function createNewAccount(req, res) {
  const { customerId } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (!customer.verified) return res.status(400).json({ message: 'Customer must complete onboarding first' });

    const newAccount = await Account.create({
      customerId,
      accountNumber: generateAccountNumber(),
    });

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
}

async function getBalance(req, res) {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json({ accountNumber: account.accountNumber, balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
}
const nibss = require('../services/nibssService');

async function createNibssAccount(req, res) {
  const { kycType, kycID, dob } = req.body;

  if (!kycType || !kycID || !dob) {
    return res.status(400).json({ message: 'kycType, kycID, and dob are required' });
  }

  try {
    const result = await nibss.createAccountKyc({ kycType, kycID, dob });
    res.status(201).json(result);
  } catch (error) {
    const nibssMessage = error.response?.data?.message || error.message;
    res.status(500).json({ message: 'Error creating NIBSS account', error: nibssMessage });
  }
}

module.exports = { createNewAccount, getBalance, createNibssAccount };
