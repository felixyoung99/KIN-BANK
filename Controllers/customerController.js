const Customer = require('../models/customer');
const nibss = require('../services/nibssService');

async function onboardCustomer(req, res) {
  const { name, email, bvn, nin, firstName, lastName, dob, phone } = req.body;

  if (!name || !email || (!bvn && !nin)) {
    return res.status(400).json({ message: 'name, email, and bvn or nin are required' });
  }

  try {
    let verificationType, verificationRef;

    if (nin) {
      await nibss.insertNin({ nin, firstName, lastName, dob, phone });
      const validation = await nibss.validateNin(nin);
      const isVerified = validation.message && validation.message.toLowerCase().includes('verified');
      if (!isVerified) return res.status(400).json({ message: 'NIN validation failed', validation });
      verificationType = 'nin';
      verificationRef = validation.response?._id || nin;
    } else {
      await nibss.insertBvn({ name, email, bvn, firstName, lastName, dob, phone });
      const validation = await nibss.validateBvn(bvn);
      const isVerified = validation.message && validation.message.toLowerCase().includes('verified');
      if (!validation.success) return res.status(400).json({ message: 'BVN validation failed', validation });
      verificationType = 'bvn';
      verificationRef = validation.response?._id || bvn;
    }

    // Save to MongoDB
    const newCustomer = await Customer.create({
      name,
      email,
      verificationType,
      verificationRef,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    const nibssMessage = error.response?.data?.message || error.message;
    if (nibssMessage?.toLowerCase().includes('already exists'))
    res.status(500).json({ message: 'Verification service error', error: nibssMessage });
  }
}

async function getCustomer(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
}

module.exports = { onboardCustomer, getCustomer };