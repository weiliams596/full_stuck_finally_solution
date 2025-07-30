const bcrypt = require('bcrypt');

const makeSecret = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

console.log(makeSecret('online_hospital'));

module.exports = makeSecret;