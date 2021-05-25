require('dotenv').config();
const { cleanEnv, makeValidator } = require('envalid');

const validator = makeValidator((str) => `${str}`.includes('mongodb://') && str);

module.exports = cleanEnv(process.env, {
  MONGO_URI: validator({ desc: 'The Base MongoDB connection URL.' }),
});
