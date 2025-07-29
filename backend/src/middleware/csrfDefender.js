const cookieParser = require('cookie-parser');
const csurf = require('csurf');
require('dotenv').config();

const csrfDefender = csurf({ cookie: {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
} });


module.exports = csrfDefender;