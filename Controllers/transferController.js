const Account = require('../models/account');
const Transaction = require('../models/transaction');
const nibss = require('../services/nibssService');

async function nameEnquiry(req, res) {
  try {
    const result = await nibss.nameEnquiry(req.params.accountNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Name enquiry failed', error: error.message });
  }
}

async function transfer(req, res) {
  const { fromAccountId, toAccountNumber, amount } = req.body;

  try {
    const fromAccount = await Account.findById(fromAccountId);
    if (!fromAccount) return res.status(404).json({ message: 'Sender account not found' });
    if (fromAccount.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

    const result = await nibss.transferFunds({
      from: fromAccount.accountNumber,
      to: toAccountNumber,
      amount,
    });

    fromAccount.balance -= amount;
    await fromAccount.save(); // persist the balance change to MongoDB

    const newTransaction = await Transaction.create({
      fromAccount: fromAccount.accountNumber,
      toAccount: toAccountNumber,
      amount,
      status: result.status || 'completed',
      reference: result.reference || null,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Transfer failed', error: error.message });
  }
}

async function transactionStatus(req, res) {
  try {
    const result = await nibss.checkTransactionStatus(req.params.reference);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Status check failed', error: error.message });
  }
}

async function transactionHistory(req, res) {
  try {
    const myAccounts = await Account.find({ customerId: req.params.customerId });
    const myAccountNumbers = myAccounts.map(a => a.accountNumber);

    const myTransactions = await Transaction.find({
      $or: [
        { fromAccount: { $in: myAccountNumbers } },
        { toAccount: { $in: myAccountNumbers } },
      ],
    });

    res.json(myTransactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
}

module.exports = { nameEnquiry, transfer, transactionStatus, transactionHistory };