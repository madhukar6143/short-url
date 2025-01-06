const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function login(req, res) {
  console.log("yes inside login")
  try {
    console.log(process.env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
     
    const { name, email, sub: googleId } = ticket.getPayload();
  
    let user = await User.findOne({ where: { googleId: googleId} });
  
    if (!user) {
      user = await User.create({
        name: name,
        email: email,
        googleId: googleId
      });   
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message)
    res. status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { login };
