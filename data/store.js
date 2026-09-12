let customers = [];
let accounts = [];
let transactions = [];

let customerIdCounter = 1;
let accountIdCounter = 1;
let transactionIdCounter = 1;

module.exports = {
  customers,
  accounts,
  transactions,
  getNextCustomerId: () => customerIdCounter++,
  getNextAccountId: () => accountIdCounter++,
  getNextTransactionId: () => transactionIdCounter++,
};