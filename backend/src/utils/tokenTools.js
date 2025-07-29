const jwt = require('jsonwebtoken');
require('dotenv').config();

/* 
    This file contains functions to generate and verify tokens for authentication and refresh tokens.
*/

/*
   This function generates a refresh token for short time access tokens.
 */
const makeToken = (obj, exp = '1h') => {
  const token = jwt.sign(obj, process.env.JSON_SECRET, { expiresIn: exp });
  const age = jwt.decode(token).exp - Math.floor(Date.now() / 1000);
  return {
    value: token,
    option: {
      httpOnly: true,
      //secure: true,       //  https only
      sameSite: 'Lax',   //  defence CSRF attack
      maxAge: age * 1000,  // 1 hour
    }
  };
};

/*
  This function verifies a refresh token and returns the object if it is valid.
*/
const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JSON_SECRET);
  if (decoded)
    return decoded;
  else
    return null;
};

module.exports = {
  makeToken,
  verifyToken
};