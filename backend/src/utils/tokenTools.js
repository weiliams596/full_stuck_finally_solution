const jwt = require('jsonwebtoken');
require('dotenv').config();

/* 
    This file contains functions to generate and verify tokens for authentication and refresh tokens.
*/

/*
   This function generates a refresh token for short time access tokens.
 */
const makeToken = (obj,exp='1h') => {
  const token = jwt.sign(obj, process.env.JSON_SECRET, { expiresIn: exp });
  return token;
};

/*
  This function verifies a refresh token and returns the object if it is valid.
*/
const verifyToken = async(token) => {
  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};


module.exports = {
};