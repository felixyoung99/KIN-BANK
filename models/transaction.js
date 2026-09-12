const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromAccount: { type: String, required: true },
  toAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String },
  status: { type: String },
  reference: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);