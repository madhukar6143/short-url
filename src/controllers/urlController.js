const { URL } = require('../models');
const shortid = require('shortid');



async function createShortURL(req, res) {
  console.log("yesssssssdfsd")
  const { longUrl, customAlias, topic ,id } = req.body;
  const alias = customAlias || shortid.generate();
  console.log("yessssssssssssss")

  try {
    const shortUrl = await URL.create({userId: id , longUrl, shortUrl: alias, topic });
    res.status(201).json({ shortUrl: shortUrl.shortUrl, createdAt: shortUrl.createdAt });
  } catch (error) {
    console.log("eyab",error.message)
    res.status(500).json({ error: 'Server error' });
  }
}

async function redirect(req, res) {
  const { alias } = req.params;

  try {
    const url = await URL.findOne({ where: { shortUrl: alias } });
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createShortURL, redirect };
