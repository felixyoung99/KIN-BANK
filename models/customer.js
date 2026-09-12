const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: true },
  verificationType: { type: String, enum: ['bvn', 'nin'] },
  verificationRef: { type: String },
}, { timestamps: true }); // adds createdAt / updatedAt automatically

module.exports = mongoose.model('Customer', customerSchema);