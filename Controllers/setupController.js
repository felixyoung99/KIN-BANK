const nibss = require('../services/nibssService');

async function onboardBank(req, res) {
  try {
    const result = await nibss.onboardBank();
    res.json(result);
  } catch (error) {
    const nibssMessage = error.response?.data || error.message;
    res.status(500).json({ message: 'Bank onboarding failed', error: nibssMessage });
  }
}

async function generateToken(req, res) {
  const { apiKey, apiSecret } = req.body;

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ message: 'apiKey and apiSecret are required' });
  }

  try {
    const result = await nibss.getAuthToken({ apiKey, apiSecret });
    res.json(result);
  } catch (error) {
    const nibssMessage = error.response?.data || error.message;
    res.status(500).json({ message: 'Token generation failed', error: nibssMessage });
  }
}

module.exports = { onboardBank, generateToken };