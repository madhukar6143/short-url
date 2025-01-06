const { URL } = require('../models');
const { Op } = require('sequelize');

async function getAnalytics(req, res) {
  const { alias } = req.params;

  try {
    const url = await URL.findOne({ where: { shortUrl: alias }, include: ['analytics'] });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json(url.analytics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getAnalytics };
